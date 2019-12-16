import { RuleOptions, Validator } from "..";
export declare function lt<Params>(reference: number, options?: RuleOptions<Params>): Validator<Params>;
export declare const lessThan: typeof lt;
