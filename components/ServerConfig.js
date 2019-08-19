

const SERVER = 'http://10.20.30.134/app/'
const USER_AGENT = 'ProcelAPP'

export function get(url) {
    return fetch(SERVER + url, {
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
    return fetch(SERVER + url, {
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