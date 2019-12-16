import { RuleOptions, Validator } from "..";
export declare function regex<Params>(pattern: string | RegExp, options?: RuleOptions<Params>): Validator<Params>;
export declare const re: typeof regex;
