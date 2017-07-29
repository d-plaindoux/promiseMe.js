/*
 * promiseME.js
 * https://github.com/d-plaindoux/magnet
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import aTry from '../data/try'

class Promise /* 'a */ {

    constructor(promise) {
        this._promise = promise;
    }

    // :: ('a -> 'b) -> Promise 'a
    onSuccess(s) {
        return new Promise(this._promise.then(
            v => { s(v); return this; },
            null
        ));
    }

    // :: (Error  -> 'b) -> Promise 'a
    onFailure(f) {
        return new Promise(this._promise.then(
            null,
            v => { f(v); return this; }
        ));
    }

    // :: (Try 'a  -> b') -> Promise 'a
    onComplete(s) {
        return new Promise(this._promise.then(
            v => { s(aTry.success(v)); return this; }, 
            v => { s(aTry.failure(v)); return this; }
        ));
    }

    // :: ('a -> 'b) -> Promise 'b
    map(f) {
        return new Promise(this._promise.then(s,null));
    }

    // :: ('a -> Promise 'b) -> Promise 'b
    flatmap(f) {
        return this._promise.then(s,null);
    }
}

function bind(promise) {
    return new Promise(promise);
}
