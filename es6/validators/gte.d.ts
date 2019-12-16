import { RuleOptions, Validator } from "..";
export declare function gte<Params>(reference: number, options?: RuleOptions<Params>): Validator<Params>;
export declare const greaterThanOrEqualTo: typeof gte;
