# optional

`optional` is a TypeScript library for dealing with empty values. JavaScript has
two empty values, `null` and `undefined`, and since TypeScript 2.0, saying some
type `T` is optional (in the broad sense of the phrase) yields three distinct
interpretations:

- `T | null`
- `T | undefined`
- `T | null | undefined`

This library is designed to handle the broadest interpretation: the last one.

## Installation

This library is [published on npm as `@urbandoor/optional`](
https://www.npmjs.com/package/@urbandoor/optional
). Simply run `npm install --save @urbandoor/optional`.

## API

The most useful part of the API lies in the exported types. A few utility functions
are also exported, but in most use cases they are not needed, because those specific
[user-defined type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
have been superseded by the ones built-in to the compiler.

- `type Empty = null | undefined`: `Empty` defines what we consider empty values.
- `type Option<T> = T | Empty`: `Option<T>` denotes type `T` with potential absence.
- `type Lazy<T> = T | (() => T)`: `Lazy<T>` is either a value of type `T` or a
  function that produces a value of type `T`. It represents something that may or
  may not have been evaluated yet.
- `isEmpty<T>(x: Option<T>): x is Empty`: `isEmpty` is a type guard that, when true,
  asserts that the given `Option<T>` is `Empty`.
- `isDefined<T>(x: Option<T>): x is T`: `isDefined` is a type guard that, when true,
  asserts that the given `Option<T>` is in fact `T` and not empty.
- `getOrElse<T>(x: Option<T>, defaultValue: Lazy<T>): T`: `getOrElse` returns the
  underlying value of a given `Option<T>` if it is non-empty. Otherwise it evaluates
  `defaultValue` using `force` and returns that instead.
- `force<T>(x: Lazy<T>): T`: `force` evaluates the given `Lazy<T>`. If the given
  value is not a function, then it is treated as having been evaluated and directly
  returned. If it is a function, then it is invoked, and its result is returned.

## Partial deprecation

When handling an `Option<T>` where `T` is not `boolean` or `number`, we actively
discourage using `isEmpty`, `isDefined`, and `getOrElse`. All three of these things
have analogous native JavaScript constructs that are considered more idiomatic:

- `isEmpty(x)` can be written as `!x` in any boolean expression or context.
- `isDefined(x)` can be written as `x` or `!!x` in any boolean expression or context.
- `getOrElse(x, () => v)` can be written as `x || v` in any expression.

TypeScript, since 2.0, has the native ability to perform type narrowing for the
idiomatic constructs to work in a type-safe manner. However, there are two outliers:

- When dealing with `Option<boolean>`, there are three falsy possibilities:
  `false`, `null`, and `undefined`. If `false` is considered distinct from `null` or
  `undefined`, standard JavaScript coercion would conflate the two.
- When dealing with `Option<number>`, there are three falsy possibilities: `0`,
  `null`, and `undefined`. If `0` is considered distinct from `null` or `undefined`,
  coercion would conflate the two.

In those two specific cases, it is actually desirable to use the utility functions
in `optional`.

## Rationale

This library does not handle `T | null` because it is a short-enough spelled type
such that it does not warrant its own type alias. It also does not handle
`T | undefined`, because in situations where that matters, such as argument or
property declaration, `x?: T` already implies `x?: T | undefined`. For a short
period of time, a bleeding edge version of TypeScript actually supported the type
syntax `T?`, but through an extended discourse it became obvious that there is no
single consensus as to what `T?` ought to mean. This library is formulated for
situations where one might see `T?` as `T | null | undefined`.

## History

Before TypeScript 2.0, the language did not expose `null` and `undefined` as
distinct types, so this library defined `type Option<T> = T | void`. Unioning with
`void` was an effective way to "poison" a type `T` so that one cannot safely access
a property without using one of the type guards. With the advent of strict null
checking support as well as distinct `null` and `undefined` types in TypeScript 2.0,
this library's role has receded into a more documentary one.
