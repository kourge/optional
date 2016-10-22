
/**
 * The Option<T> type represents a potential absence in the value T.
 */
export type Option<T> = T | Empty;

/**
 * The Empty type represents the values that are considered empty, which are null
 * and undefined.
 */
export type Empty = undefined | null;

function isFalsy(x: any): boolean {
  return x === undefined || x === null;
}

/**
 * Narrows the input to Empty if it is empty. Deprecated since TypeScript 2.0 can
 * do this natively without a user-defined type guard.
 */
export function isEmpty<T>(x: Option<T>): x is Empty {
  return isFalsy(x);
}

/**
 * Narrows the input to T if it is defined. Deprecated since TypeScript 2.0 can
 * do this natively without a user-defined type guard.
 */
export function isDefined<T>(x: Option<T>): x is T {
  return !isFalsy(x);
}

/**
 * Returns the input as T if it is defined. Otherwise evaluate defaultValue and
 * return the result instead. Deprecated since TypeScript 2.0 can do this natively
 * without a user-defined type guard.
 */
export function getOrElse<T>(o: Option<T>, defaultValue: Lazy<T>): T {
  return isDefined(o) ? o : force(defaultValue);
}

/**
 * The Lazy<T> type represents either a function that returns T or a plain T.
 */
export type Lazy<A> = A | (() => A);

/**
 * Evaluates a Lazy<T> to T. If it is already T, it is returned as is. If it is a
 * function, it is invoked, the result of which is then returned.
 */
function force<A>(lazy: Lazy<A>): A {
  return lazy instanceof Function ? lazy() : lazy;
}
