
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

/**
 * Wraps an Option<T> in an Optional<T> helper class.
 */
export function toOptional<T>(x: Option<T>): Optional<T> {
  return isEmpty(x) ? None : new Some(x);
}

export abstract class Optional<A> {
  abstract toString(): string;
  abstract orElse(defaultValue: Lazy<A>): A;
  abstract flatMap<B>(f: (value: A) => Optional<B>): Optional<B>;
  abstract pureMap<B>(f: (value: A) => B): Optional<B>;
  abstract map<B>(f: (value: A) => B | Optional<B>): Optional<B>;
  abstract filter(f: (value: A) => boolean): Optional<A>;
}

class NoneClass extends Optional<any> {
  toString(): string {
    return 'None';
  }

  orElse<A>(defaultValue: Lazy<A>): A {
    return force(defaultValue);
  }

  flatMap<B>(f: (value: any) => Optional<B>): Optional<B> {
    return this;
  }

  pureMap<B>(f: (value: any) => B): Optional<B> {
    return this;
  }

  map<B>(f: (value: any) => B | Optional<B>): Optional<B> {
    return this;
  }

  filter<B>(f: (value: any) => boolean): Optional<B> {
    return this;
  }
}

/* tslint:disable:variable-name */
export const None: Optional<any> = new NoneClass();
/* tslint:enable:variable-name */

export class Some<A> extends Optional<A> {
  constructor(public value: A) {
    super();
  }

  toString(): string {
    return `Some(${this.value})`;
  }

  orElse(defaultValue: Lazy<A>): A {
    return this.value;
  }

  flatMap<B>(f: (value: A) => Optional<B>): Optional<B> {
    return f(this.value);
  }

  pureMap<B>(f: (value: A) => B): Optional<B> {
    return new Some(f(this.value));
  }

  map<B>(f: (value: A) => B | Optional<B>): Optional<B> {
    const result = f(this.value);
    return result instanceof Optional ? result : new Some(result);
  }

  filter(f: (value: A) => boolean): Optional<A> {
    return f(this.value) ? this : None;
  }
}
