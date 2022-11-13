const swApi = {}

// Request API Content
swApi.getObject = (page = 1, requesting = '') => {
    const url = `https://swapi.dev/api/${requesting}/?page=${page}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
}