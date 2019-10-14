

const USER_AGENT = 'ProcelAPP'

export function get(url) {
    return fetch(global.server + url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': USER_AGENT
        }
    })
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            return responseJson
        })
        .catch(error => console.warn(error))
}

export function post(url, params) {
    return fetch(global.server + url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': USER_AGENT
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            return responseJson
        })
        .catch(error => console.warn(error))
}

export { };