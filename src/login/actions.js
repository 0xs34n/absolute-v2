import { firebaseAuth } from '../firebase'

function currentAuth(user) {
    return {
        type: "CURRENT_AUTH",
        payload: user
    };
};

// Listens for any users that's being signed in, if no user signed in , logout
export function authListener() {
    return (dispatch) => {
        firebaseAuth.onAuthStateChanged(authdata => {
            if(authData) {
                dispatch(currentAuth(authData))
            } else {
                dispatch(signOut)
            }
        })
    }
}

function signingIn() {
    return {
        type: "SIGNING_IN"
    }
}

export function signInError(error) {
    return {
        type: "SIGN_IN_ERROR",
        payload: error
    };
};

function signInSuccess(result) {
    return {
        type: "SIGN_IN_SUCCESS",
        payload: result
    };
};

// sign in should trigger onAuthStateChanged
export function signIn(email, password) {
    return dispatch => {
        dispatch(signingIn());
        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(result => dispatch(signInSuccess(result)))
            .catch(error => dispatch(signInError(error)));
    };
}

function singingOut() {
    return {
        type: "SIGNING_OUT"
    }
}

function signOutError(error) {
    return {
        type: "SIGN_OUT_ERROR",
        payload: error
    }
}

function signOutSuccess() {
    return {
        type: "SIGN_OUT_SUCCESS"
    };
};

export function signOut() {
    return dispatch => {
        dispatch(signingOut());
        firebaseAuth.signOut()
            .then(() => dispatch(signOutSuccess()));
    };
};
