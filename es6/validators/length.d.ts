import { RuleOptions, Validator } from "..";
export declare function length<Params>(requirements: number | {
    min: number;
} | {
    max: number;
} | {
    min: number;
    max: number;
} | {
    is: number;
}, options?: RuleOptions<Params>): Validator<Params>;
export declare const len: typeof length;
export declare const size: typeof length;
