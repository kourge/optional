"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
/**
 * Wraps an Option<T> in an Optional<T> helper class.
 */
function toOptional(x) {
    return isEmpty(x) ? exports.None : new Some(x);
}
exports.toOptional = toOptional;
var Optional = (function () {
    function Optional() {
    }
    return Optional;
}());
exports.Optional = Optional;
var NoneClass = (function (_super) {
    __extends(NoneClass, _super);
    function NoneClass() {
        _super.apply(this, arguments);
    }
    NoneClass.prototype.toString = function () {
        return 'None';
    };
    NoneClass.prototype.orElse = function (defaultValue) {
        return force(defaultValue);
    };
    NoneClass.prototype.flatMap = function (f) {
        return this;
    };
    NoneClass.prototype.pureMap = function (f) {
        return this;
    };
    NoneClass.prototype.map = function (f) {
        return this;
    };
    NoneClass.prototype.filter = function (f) {
        return this;
    };
    return NoneClass;
}(Optional));
/* tslint:disable:variable-name */
exports.None = new NoneClass();
/* tslint:enable:variable-name */
var Some = (function (_super) {
    __extends(Some, _super);
    function Some(value) {
        _super.call(this);
        this.value = value;
    }
    Some.prototype.toString = function () {
        return "Some(" + this.value + ")";
    };
    Some.prototype.orElse = function (defaultValue) {
        return this.value;
    };
    Some.prototype.flatMap = function (f) {
        return f(this.value);
    };
    Some.prototype.pureMap = function (f) {
        return new Some(f(this.value));
    };
    Some.prototype.map = function (f) {
        var result = f(this.value);
        return result instanceof Optional ? result : new Some(result);
    };
    Some.prototype.filter = function (f) {
        return f(this.value) ? this : exports.None;
    };
    return Some;
}(Optional));
exports.Some = Some;
