
const InitialAuthState = {
    authenticated: false,
    user: null,
    error: null,
    inProgress: false
}

export default function authReducer(state = InitialAuthState, {payload, type}) {
    switch (type) {
        case "CURRENT_AUTH":
            return Object.assign({}, state, {
                authenticated: true,
                user: payload,
                inProgress: false
            });
        case "SIGNING_IN":
            return Object.assign({}, state, {
                inProgress: true
            });
        case "SIGN_IN_SUCCESS":
            return Object.assign({}, state, {
                authenticated: true,
                user: payload.user,
                inProgress: false
            });
        case "SIGN_IN_ERROR":
            return Object.assign({}, state, {
                error: payload
            });
        case "SIGNING_OUT":
            return Object.assign({}, state, {
                inProgress: true
            });
        case "SIGN_OUT_SUCCESS":
            return InitialAuthState;
        case "SIGN_OUT_ERROR":
            return Object.assign({}, state, {
                error: payload
            })
        default:
            return state;
    }
}