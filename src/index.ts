
/**
 * The Option<T> type represents a potential absence in the value T. It enforces
 * null checks by providing helpers that not only do so, but also narrow the
 * type accordingly.
 */
export type Option<T> = T | void;

function isFalsy(x: any): boolean {
  return x === undefined || x === null;
}

export function isEmpty<T>(x: Option<T>): x is void {
  return isFalsy(x);
}

export function isDefined<T>(x: Option<T>): x is T {
  return !isFalsy(x);
}

export type Lazy<A> = A | (() => A);

function force<A>(lazy: Lazy<A>): A {
  return lazy instanceof Function ? lazy() : lazy;
}

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
