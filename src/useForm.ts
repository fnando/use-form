import { useCallback, useState } from "react";
import * as validators from "./validators";
import {
  Errors,
  Form,
  UseFormInitializer,
  UseFormOptions,
  Validations,
  Validator,
  Validators,
  Values,
} from ".";

/**
 * `useForm` is the React hook for validating form inputs. It returns an object
 * with several helpers to retrieve error messages and form value, define
 * validations and more.
 *
 * @example
 * ```ts
 * import React from "react";
 * import { useForm } from "@fnando/use-form";
 *
 * type FormParams = {
 *   name: string;
 *   email: string;
 *   password: string;
 *   passwordConfirmation: string;
 * };
 *
 * export const SignupScreen: React.FC = () => {
 *   const { errors, values, ...form } = useForm<FormParams>(({ required, confirm, regex }) => ({
 *     name: [required()],
 *     email: [required(), regex(/^\S+@\S+$/)],
 *     password: [required()],
 *     passwordConfirmation: [confirm("password")]
 *   }));
 *
 *   return (
 *     <form onSubmit={form.handleSubmit}>
 *       <p>
 *         <label>
 *           Your name
 *           <br />
 *           <input name="name" onChange={form.handleChange} />
 *         </label>
 *       </p>
 *
 *       <p>
 *         <label>
 *           Your email
 *           <br />
 *           <input name="email" type="email" onChange={form.handleChange} />
 *         </label>
 *       </p>
 *
 *       <p>
 *         <label>
 *           Choose a password
 *           <br />
 *           <input name="password" type="password" onChange={form.handleChange} />
 *         </label>
 *       </p>
 *
 *       <p>
 *         <label>
 *           Confirm your password
 *           <br />
 *           <input name="passwordConfirmation" type="password" onChange={form.handleChange} />
 *         </label>
 *       </p>
 *
 *       <p>
 *         <button>Sign up</button>
 *       </p>
 *     </form>
 *   );
 * };
 * ```
 *
 * `useForm` returns an object that contains everything you need.
 *
 * - `defaultValues`: this is the object you provide while initializing the
 *   form so you don't have to define beforehand.
 * - `errors`: this is an object like `{attribute: string[]}` which contains all
 *   error messages for invalid attributes. If you need to transform error
 *   messages in any way, use the `validations` property to derive a new object.
 * - `handleChange`: the input's `onChange` handler.
 * - `isInvalid()`: a function that returns `true` if the validation fails.
 * - `isValid()`: a function that returns `true` if the validation succeeds.
 * - `reset()`: reset the form's state; i.e. resets `validations` and `errors`.
 *   Also restores `values` to the `defaultValues`.
 * - `validations`: an object that contains everything related to the
 *   validation. For more info about the result check `Validation`.
 * - `values`: the current form's state.
 *
 * @param {UseFormInitializer} init The initializer function. The provided
 *                                  function will receive all built-in
 *                                  validation rules bundled with
 *                                  `@fnando/use-form`.
 * @param {UseFormOptions<Params>} options The hook options.
 * @param {Values<Params>} options.defaultValues The form default values.
 * @returns {Form<Params>} The form helpers.
 */
export function useForm<Params>(
  init: UseFormInitializer<Params>,
  { defaultValues }: UseFormOptions<Params> = {},
): Form<Params> {
  const initMemo = useCallback(init, []);
  const [formValidators] = useState<Validators<Params>>(
    initMemo((validators as unknown) as Validations<Params>),
  );
  const [errors, setErrors] = useState<Errors<Params>>({} as Errors<Params>);
  const [validations, setValidations] = useState<Validations<Params>>(
    {} as Validations<Params>,
  );
  const [values, setValues] = useState<Values<Params>>({
    ...defaultValues,
  } as Values<Params>);

  // When setting errors with `setErrors`, one event loop cycle is required to
  // actually update the state. The problem is that a function used as the form
  // handler will still see error messages even if the form has valid data.
  // By mutating the existing object, we ensure that once we reset
  const resetByMutation = <T>(target: T): void => {
    Object.keys(target).forEach((key) => delete errors[key as keyof Params]);
  };

  const resetErrors = (): void => {
    resetByMutation<Errors<Params>>(errors);
    setErrors({} as Errors<Params>);
  };

  const resetValidations = (): void => {
    resetByMutation<Validations<Params>>(validations);
    setValidations({} as Validations<Params>);
  };

  // Reset current state.
  const reset = (): void => {
    setValues({ ...defaultValues } as Values<Params>);
    resetErrors();
    resetValidations();
  };

  const isValid = (): boolean => {
    const newErrors = {} as Errors<Params>;
    const newValidations = {} as Validations<Params>;
    let valid = true;

    resetErrors();

    Object.keys(formValidators).forEach((attribute) => {
      newErrors[attribute as keyof Params] = [];
      newValidations[attribute as keyof Params] = [];

      const attributeValidators =
        formValidators[attribute] || ([] as Validator<Params>[]);

      const attributeDescriptor =
        attributeValidators instanceof Array
          ? {
              label: attribute.replace(/_/g, " "),
              validators: attributeValidators,
            }
          : attributeValidators;

      attributeDescriptor.validators.forEach((validator: Validator<Params>) => {
        const validation = validator(
          attribute,
          values[attribute as keyof Params] || "",
          values,
        );
        valid = valid && validation.valid;

        newValidations[attribute as keyof Params].push(validation);

        if (!validation.valid) {
          newErrors[attribute as keyof Params].push(validation.message);
        }
      });
    });

    resetErrors();
    setErrors(newErrors as Errors<Params>);
    setValidations(newValidations as Validations<Params>);

    return valid;
  };

  // Define the inverse function to improve code readability.
  const isInvalid = (): boolean => !isValid();

  return {
    defaultValues: defaultValues || ({} as Values<Params>),
    isValid,
    isInvalid,
    errors: errors as Errors<Params>,
    values: values as Params,
    validations: validations as Validations<Params>,
    reset,
    setErrors,
    handleSubmit(handleSubmit) {
      return (event: React.BaseSyntheticEvent): void => {
        event.preventDefault();
        handleSubmit(event);
      };
    },
    handleChange(event: React.BaseSyntheticEvent): void {
      const { target } = event;

      if (!target.name) {
        throw new Error(`${target} doesn't have a "name" attribute.`);
      }

      setValues({ ...values, [target.name]: target.value });
    },
  } as Form<Params>;
}
