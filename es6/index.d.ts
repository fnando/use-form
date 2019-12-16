/// <reference types="react" />
export interface RuleOptions<Params> {
    args?: any[];
    message?: string | MessageResolver<Params>;
    type?: string;
}
export declare type CustomMessageResolverOptions<Params> = {
    args: any[];
    attribute: string;
    options: RuleOptions<Params>;
    values: Values<Params>;
    input: any;
};
export declare type MessageResolver<Params> = (options: CustomMessageResolverOptions<Params>) => string;
export declare type ErrorBuilderOptions<Params> = {
    args?: any[];
    attribute: string;
    defaultMessage: string;
    input: any;
    options: RuleOptions<Params> | undefined;
    values: Values<Params>;
};
export declare type Validator<Params> = (attribute: string, input: any, values: Values<Params>) => Validation<Params>;
export declare type Validation<Params> = {
    args: any[];
    attribute: string;
    input: any;
    message: string;
    optional?: boolean;
    type: string;
    valid: boolean;
    values: Values<Params>;
};
export declare type Validations<Params> = {
    [K in keyof Params]: Validation<Params>[];
};
export declare type Errors<Params> = {
    [K in keyof Params]: string[];
};
export declare type Values<Params> = {
    [K in keyof Params]: any;
};
export declare type EventHandler = (event: React.BaseSyntheticEvent) => void;
export interface Form<Params> {
    defaultValues: {
        [K in keyof Params]: any;
    };
    errors: Errors<Params>;
    handleChange: EventHandler;
    handleSubmit: (handleSubmit: EventHandler) => EventHandler;
    isInvalid: () => boolean;
    isValid: () => boolean;
    reset: () => void;
    validations: Validations<Params>;
    values: Params;
    setErrors: (errors: Errors<Params>) => void;
}
export interface Validators<Params> {
    [attribute: string]: Validator<Params>[] | AttributeDescriptor<Params>;
}
export interface AttributeDescriptor<Params> {
    label: string;
    validators: Validator<Params>[];
}
export declare type UseFormInitializer<Params> = (validations: Validations<Params>) => Validators<Params>;
export declare type UseFormOptions<Params> = {
    defaultValues?: Values<Params>;
};
export * from "./validators";
export * from "./helpers";
export * from "./useForm";
