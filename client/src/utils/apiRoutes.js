export const HOST = process.env.NEXT_PUBLIC_HOST

const AUTH_ROUTE = `${HOST}/api/auth`

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`