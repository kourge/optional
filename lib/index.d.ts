/**
 * The Option<T> type represents a potential absence in the value T.
 */
export declare type Option<T> = T | Empty;
/**
 * The Empty type represents the values that are considered empty, which are null
 * and undefined.
 */
export declare type Empty = undefined | null;
/**
 * Narrows the input to Empty if it is empty. Deprecated since TypeScript 2.0 can
 * do this natively without a user-defined type guard.
 */
export declare function isEmpty<T>(x: Option<T>): x is Empty;
/**
 * Narrows the input to T if it is defined. Deprecated since TypeScript 2.0 can
 * do this natively without a user-defined type guard.
 */
export declare function isDefined<T>(x: Option<T>): x is T;
/**
 * Returns the input as T if it is defined. Otherwise evaluate defaultValue and
 * return the result instead. Deprecated since TypeScript 2.0 can do this natively
 * without a user-defined type guard.
 */
export declare function getOrElse<T>(o: Option<T>, defaultValue: Lazy<T>): T;
/**
 * The Lazy<T> type represents either a function that returns T or a plain T.
 */
export declare type Lazy<A> = A | (() => A);
