"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function isFalsy(x) {
    return x === undefined || x === null;
}
function isEmpty(x) {
    return isFalsy(x);
}
exports.isEmpty = isEmpty;
function isDefined(x) {
    return !isFalsy(x);
}
exports.isDefined = isDefined;
function force(lazy) {
    return lazy instanceof Function ? lazy() : lazy;
}
function toOptional(x) {
    return isEmpty(x) ? exports.None : new Some(x);
}
exports.toOptional = toOptional;
function getOrElse(o, defaultValue) {
    if (isDefined(o)) {
        return o;
    }
    else {
        return defaultValue instanceof Function ? defaultValue() : defaultValue;
    }
}
exports.getOrElse = getOrElse;
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
