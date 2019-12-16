import { RuleOptions, Validator } from "..";
export declare function eq<Params>(reference: number | string | boolean, options?: RuleOptions<Params>): Validator<Params>;
export declare const equalTo: typeof eq;
