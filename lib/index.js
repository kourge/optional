"use strict";
function isFalsy(x) {
    return x === undefined || x === null;
}
/**
 * Narrows the input to Empty if it is empty. Deprecated since TypeScript 2.0 can
 * do this natively without a user-defined type guard.
 */
function isEmpty(x) {
    return isFalsy(x);
}
exports.isEmpty = isEmpty;
/**
 * Narrows the input to T if it is defined. Deprecated since TypeScript 2.0 can
 * do this natively without a user-defined type guard.
 */
function isDefined(x) {
    return !isFalsy(x);
}
exports.isDefined = isDefined;
/**
 * Returns the input as T if it is defined. Otherwise evaluate defaultValue and
 * return the result instead. Deprecated since TypeScript 2.0 can do this natively
 * without a user-defined type guard.
 */
function getOrElse(o, defaultValue) {
    return isDefined(o) ? o : force(defaultValue);
}
exports.getOrElse = getOrElse;
/**
 * Evaluates a Lazy<T> to T. If it is already T, it is returned as is. If it is a
 * function, it is invoked, the result of which is then returned.
 */
function force(lazy) {
    return lazy instanceof Function ? lazy() : lazy;
}
