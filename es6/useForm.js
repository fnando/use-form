import { useCallback, useState } from "react";
import * as validators from "./validators";
export function useForm(init, { defaultValues } = {}) {
    const initMemo = useCallback(init, []);
    const [formValidators] = useState(initMemo(validators));
    const [errors, setErrors] = useState({});
    const [validations, setValidations] = useState({});
    const [values, setValues] = useState(Object.assign({}, defaultValues));
    const resetByMutation = (target) => {
        Object.keys(target).forEach((key) => delete errors[key]);
    };
    const resetErrors = () => {
        resetByMutation(errors);
        setErrors({});
    };
    const resetValidations = () => {
        resetByMutation(validations);
        setValidations({});
    };
    const reset = () => {
        setValues(Object.assign({}, defaultValues));
        resetErrors();
        resetValidations();
    };
    const isValid = () => {
        const newErrors = {};
        const newValidations = {};
        let valid = true;
        resetErrors();
        Object.keys(formValidators).forEach((attribute) => {
            newErrors[attribute] = [];
            newValidations[attribute] = [];
            const attributeValidators = formValidators[attribute] || [];
            const attributeDescriptor = attributeValidators instanceof Array
                ? {
                    label: attribute.replace(/_/g, " "),
                    validators: attributeValidators,
                }
                : attributeValidators;
            attributeDescriptor.validators.forEach((validator) => {
                const validation = validator(attribute, values[attribute] || "", values);
                valid = valid && validation.valid;
                newValidations[attribute].push(validation);
                if (!validation.valid) {
                    newErrors[attribute].push(validation.message);
                }
            });
        });
        resetErrors();
        setErrors(newErrors);
        setValidations(newValidations);
        return valid;
    };
    const isInvalid = () => !isValid();
    return {
        defaultValues: defaultValues || {},
        isValid,
        isInvalid,
        errors: errors,
        values: values,
        validations: validations,
        reset,
        setErrors,
        handleSubmit(handleSubmit) {
            return (event) => {
                event.preventDefault();
                handleSubmit(event);
            };
        },
        handleChange(event) {
            const { target } = event;
            if (!target.name) {
                throw new Error(`${target} doesn't have a "name" attribute.`);
            }
            setValues(Object.assign(Object.assign({}, values), { [target.name]: target.value }));
        },
    };
}
//# sourceMappingURL=useForm.js.map