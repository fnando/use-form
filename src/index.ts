export interface RuleOptions<Params> {
  /**
   * The original list of arguments that was passed to the validator.
   *
   * @example
   * ```ts
   * range(1, 99) #=> args = [1, 99]
   * ```
   */
  args?: any[];

  /**
   * The error message string or function that resolves to a string.
   */
  message?: string | MessageResolver<Params>;

  /**
   * The validation's type that must be used. This is useful so custom
   * validators can override built-in validators.
   */
  type?: string;
}

export type CustomMessageResolverOptions<Params> = {
  args: any[];
  attribute: string;
  options: RuleOptions<Params>;
  values: Values<Params>;
  input: any;
};

export type MessageResolver<Params> = (
  options: CustomMessageResolverOptions<Params>,
) => string;

export type ErrorBuilderOptions<Params> = {
  args?: any[];
  attribute: string;
  defaultMessage: string;
  input: any;
  options: RuleOptions<Params> | undefined;
  values: Values<Params>;
};

export type Validator<Params> = (
  attribute: string,
  input: any,
  values: Values<Params>,
) => Validation<Params>;

export type Validation<Params> = {
  args: any[];
  attribute: string;
  input: any;
  message: string;
  optional?: boolean;
  type: string;
  valid: boolean;
  values: Values<Params>;
};

export type Validations<Params> = {
  [K in keyof Params]: Validation<Params>[];
};

export type Errors<Params> = {
  [K in keyof Params]: string[];
};

export type Values<Params> = {
  [K in keyof Params]: any;
};

export type EventHandler = (event: React.BaseSyntheticEvent) => void;

export interface Form<Params> {
  /**
   * The form's default values. This is provided during the [[useForm]] call.
   */
  defaultValues: { [K in keyof Params]: any };

  /**
   * The object that holds all error messages for attributes. This is generated
   * whenever you call [[Form.isValid]] or [[Form.isInvalid]].
   */
  errors: Errors<Params>;

  /**
   * The input's `onChange` event handler. An exception will be raised if your
   * input doesn't have a `name` attribute.
   */
  handleChange: EventHandler;

  /**
   * The form's `onSubmit` handler. It calls `preventDefault()` and delegates
   * the original event to the provided `handleSubmit` param.
   */
  handleSubmit: (handleSubmit: EventHandler) => EventHandler;

  /**
   * Run validations and return `true` if any validation fails.
   */
  isInvalid: () => boolean;

  /**
   * Run validations and return `false` if any validation fails.
   */
  isValid: () => boolean;

  /**
   * Reset the form's result.
   *
   * - Set `values` to `defaultValues`.
   * - Reset `errors`.
   * - Reset `validations`.
   */
  reset: () => void;

  /**
   * Hold all validations. This will be initialized whenever [[isValid]] or
   * [[isInvalid]] functions are called.
   */
  validations: Validations<Params>;

  /**
   * Hold the form's values. This will be initialized with any [[defaultValues]]
   * provided during [[useForm]] call.
   */
  values: Params;

  /**
   * Set form error messages.
   * This can be useful to populate form errors out of HTTP responses.
   */
  setErrors: (errors: Errors<Params>) => void;
}

export interface Validators<Params> {
  [attribute: string]: Validator<Params>[] | AttributeDescriptor<Params>;
}

export interface AttributeDescriptor<Params> {
  /**
   * The readable attribute's name.
   */
  label: string;

  /**
   * List of validators.
   */
  validators: Validator<Params>[];
}

export type UseFormInitializer<Params> = (
  validations: Validations<Params>,
) => Validators<Params>;

export type UseFormOptions<Params> = {
  defaultValues?: Values<Params>;
};

export * from "./validators";
export * from "./helpers";
export * from "./useForm";
