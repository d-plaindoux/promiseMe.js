/*
 * promiseMe.js
 * https://github.com/d-plaindoux/magnet
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class Success {
    constructor(value) {
        this._value = value;
    }

    apply(monadicPromise) {
        monadicPromise.success(this._value);
    }
}

class Failure {
    constructor(value) {
        this._value = value;
    }

    apply(monadicPromise) {
        monadicPromise.failure(this._value);
    }
}

class MonadicPromise /* 'a */ {
    
    // :: Promise 'a -> ('a -> ()) -> (Error -> ()) -> MonadicPromise 'a
    constructor(promise, onSuccess, onFailure) {
        let setSuccess = (value) => {
            this._value = new Success(value);
            this._value.apply(this);
        };

        let setFailure = (error) => {
            this._value = new Failure(error);
            this._value.apply(this);
        };

        this._value = undefined;
        this._error = undefined;
        
        this._success = onSuccess || (_ => null);
        this._failure = onFailure || (_ => null);
        
        this._promise = promise.then(this.setSuccess, this.setFailure);
    }

    // :: 'a -> ()
    success(value) {
        this._success(this._value);
    }

    // :: Error -> ()
    failure(error) {
        this._failure(error);
    }

    // :: ('a -> 'b) -> Promise 'a
    onSuccess(s) {
        if (this._value) {
            this._value.apply(this._value);
        }
        return new MonadicPromise(this._promise, s, null);
    }

    // :: (Error  -> 'b) -> Promise 'a
    onFailure(f) {
        return new MonadicPromise(this._promise, null, s);
    }

    // :: ('a -> 'b) -> Promise 'b
    map(f) {
        return new MonadicPromise(this._promise, s, null);
    }

    // :: ('a -> Promise 'b) -> Promise 'b
    flatmap(f) {
        return new MonadicPromise(this._promise, s, null);
    }
}

export function monadic(promise, onSuccess, onFailure) {
    return new MonadicPromise(promise, onSuccess, onFailure);
}

