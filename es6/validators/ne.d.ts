import { RuleOptions, Validator } from "..";
export declare function ne<Params>(reference: number | string | boolean, options?: RuleOptions<Params>): Validator<Params>;
export declare const notEqualTo: typeof ne;
