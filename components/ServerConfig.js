

const server = 'http://10.20.30.134/app/'


export function get(url) {
    return fetch(server + url)
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            return responseJson
        })
        .catch(error => console.warn(error))
}

export function post(url, params) {
    return fetch(server + url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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