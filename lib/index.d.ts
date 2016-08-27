/**
 * The Option<T> type represents a potential absence in the value T. It enforces
 * null checks by providing helpers that not only do so, but also narrow the
 * type accordingly.
 */
export declare type Option<T> = T | void;
export declare function isEmpty<T>(x: Option<T>): x is void;
export declare function isDefined<T>(x: Option<T>): x is T;
export declare type Lazy<A> = A | (() => A);
export declare function toOptional<T>(x: Option<T>): Optional<T>;
export declare function getOrElse<T>(o: Option<T>, defaultValue: T | (() => T)): T;
export declare abstract class Optional<A> {
    abstract toString(): string;
    abstract orElse(defaultValue: Lazy<A>): A;
    abstract flatMap<B>(f: (value: A) => Optional<B>): Optional<B>;
    abstract pureMap<B>(f: (value: A) => B): Optional<B>;
    abstract map<B>(f: (value: A) => B | Optional<B>): Optional<B>;
    abstract filter(f: (value: A) => boolean): Optional<A>;
}
export declare const None: Optional<any>;
export declare class Some<A> extends Optional<A> {
    value: A;
    constructor(value: A);
    toString(): string;
    orElse(defaultValue: Lazy<A>): A;
    flatMap<B>(f: (value: A) => Optional<B>): Optional<B>;
    pureMap<B>(f: (value: A) => B): Optional<B>;
    map<B>(f: (value: A) => B | Optional<B>): Optional<B>;
    filter(f: (value: A) => boolean): Optional<A>;
}
