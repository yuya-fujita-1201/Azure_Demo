export declare type ErrorInterface = Error;
export declare var intellisense: any;
export declare class Error implements ErrorInterface {
    name: string;
    message: string;
    static captureStackTrace(object: any, objectConstructor?: Function): any;
}
export declare class Exception extends Error {
    name: string;
    message: string;
    data: any;
    constructor(message: string, name?: string, data?: any);
    _getStackTrace(): void;
}
export declare class Guard {
    static requireValue(name: string, value: any): void;
    static requireType(name: string, value: any, typeOrTypes: any): boolean;
    static raise(exception: string): void;
    static raise(exception: Exception): void;
    static isNullOrUndefined(value: any): boolean;
}
