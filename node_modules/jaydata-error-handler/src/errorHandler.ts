export declare type ErrorInterface = Error;
export declare var intellisense:any;
export declare class Error implements ErrorInterface {
    name: string;
    message: string;
    static captureStackTrace(object:any, objectConstructor?:Function);
}

export class Exception extends Error {
	name:string
	message:string
	data:any
	constructor(message:string, name?:string, data?:any) {
		super();

		if (Error.captureStackTrace){
			Error.captureStackTrace(this, this.constructor);
		}

		this.name = name || "Exception";
		this.message = message;
		this.data = data;
	}
	_getStackTrace(){}
}

export class Guard {
	static requireValue(name:string, value:any):void {
		if (typeof value === 'undefined' || value === null) {
			Guard.raise(name + " requires a value other than undefined or null");
		}
	}
	static requireType(name:string, value:any, typeOrTypes:any):boolean {
		var types = typeOrTypes instanceof Array ? typeOrTypes : [typeOrTypes];
		return types.some(function(item) {
			switch (typeof item) {
				case "string":
					return typeof value === item;
				case "function":
					return value instanceof item;
				default:
					Guard.raise("Unknown type format : " + typeof item + " for: " + name);
			}
		});
	}
	static raise(exception:string):void
	static raise(exception:Exception):void
	static raise(exception:any):void {
		if (typeof intellisense === 'undefined') {
			if (exception instanceof Exception) {
				console.error(exception.name + ':', exception.message + '\n', exception);
			} else {
				console.error(exception);
			}

			throw exception;
		}
	}
	static isNullOrUndefined(value:any):boolean {
		return value === undefined || value === null;
	}
}
