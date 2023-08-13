import Cookie from 'js-cookie'

const cookies = Cookie.withAttributes({expires: 14, path:'/', secure: true})

export const setCookie = (key: string, value: string, shouldExpire?: boolean) => {
    cookies.set(key, value, {expires: shouldExpire ? undefined : 14})
}

export const getCookie = (key: string) => {
    return Cookie.get(key || '')
}

export const deleteCookie = (key: string) => {
    Cookie.remove(key)
}