import { reducerCases } from './constants';
export const initialState = {
    // userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    userInfo: null,
    newUser: false,
    contactsPage: false,
    currentChatUser: null,
    messages: []
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

        case reducerCases.SET_ALL_CONTACTS_PAGE:
            return {
                ...state,
                contactsPage: !state.contactsPage
            }

        case reducerCases.CHANGE_CURRENT_CHAT_USER:
            return {
                ...state,
                currentChatUser: action.user
            }

        case reducerCases.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }

        default:
            return state
    }
}

export default reducer