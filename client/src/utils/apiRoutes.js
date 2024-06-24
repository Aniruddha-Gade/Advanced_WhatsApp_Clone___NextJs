export const HOST = process.env.NEXT_PUBLIC_HOST

const AUTH_ROUTE = `${HOST}/api/auth`
const MESSAGES_ROUTE = `${HOST}/api/messages`

// auth routes
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`
export const GET_ALL_CONTACTS_ROUTE = `${AUTH_ROUTE}/get-contacts`

// messages routes
export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`
export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-image-message`