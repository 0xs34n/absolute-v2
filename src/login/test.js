import { expect } from 'chai';

import authReducer from './reducer';

describe('Login Reducer', () => {
    describe('CURRENT_AUTH', () => {
        it('should set authenticated state to true when there is a payload', () => {
            let state = authReducer(undefined, {
                type: "CURRENT_AUTH",
                payload: {}
            });

            expect(state).to.eql({
                authenticated: true,
                user: {},
                error: null,
                inProgress: false
            });
        })
    })

    describe('SIGNING_IN', () => {
        it('should set authenticated state in progree to true', () => {
            let state = authReducer(undefined, {
                type: "SIGNING_IN",
            });

            expect(state).to.eql({
                authenticated: false,
                user: null,
                error: null,
                inProgress: true
            });
        });
    })

    describe('SIGN_IN_ERROR', () => {
        it('should set authenticated state error to error object', () => {
            let state = authReducer(undefined, {
                type: "SIGN_IN_ERROR",
                payload: {}
            });

            expect(state).to.eql({
                authenticated: false,
                user: null,
                error: {},
                inProgress: false
            });
        });
    })
})
