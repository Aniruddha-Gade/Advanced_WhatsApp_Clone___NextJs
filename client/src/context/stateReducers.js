import { reducerCases } from './constants';
export const initialState = {
    // userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    userInfo: null,
    newUser: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }

        case reducerCases.SET_NEW_USER:
            return {
                ...state,
                newUser: action.newUser
            }

        default:
            return state
    }
}

export default reducer