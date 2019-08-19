



export async function sync() {
    console.log('sincronizando.....')

    return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve(true)
        }, 5000);
      })
    // return fetch(SERVER + url, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'User-Agent': USER_AGENT
    //     }
    // })
    //     .then((response) => {
    //         return response.json()
    //     })
    //     .then((responseJson) => {
    //         return responseJson
    //     })
    //     .catch(error => console.warn(error))
}


export { };