import { fetchUtils } from 'react-admin'

const httpClient = fetchUtils.fetchJson
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file.rawFile)
    })

export default { // TODO: figure out how to write data provider
    getList: (resource, params) => {
        const { page, perPage } = params.pagination
        const offset = (page - 1) * perPage
        const url = `/${resource}?limit=${perPage}&offset=${offset}`
        return httpClient(url)
            .then(response => response.json)
            .then(({ count, rows }) => {
            return {
                data: rows,
                total: count
            }
            })
    },

    getOne: (resource, params) => 
        httpClient(`/${resource}/${params.id}`)
            .then(response => ({ data: Object.values(response.json)[0] })),

    create: (resource, params) => {
        if (resource !== 'files') {
            return httpClient(`/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data)
            })
            .then(response => ({ data: Object.values(response.json)[1] }))
        }
        const file = params.data.content
        return Promise.resolve(convertFileToBase64(file))
            .then(base64File => {
                console.log(base64File)
                return { ...params.data, content: base64File }
            })
            .then(() => {
                return httpClient(`/${resource}`, {
                    method: 'POST',
                    body: JSON.stringify(params.data)
                })
                .then(response => ({ data: Object.values(response.json)[1] }))
            })
            .then(results => results)
        },

    update: (resource, params) =>
        httpClient(`/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        .then(response => ({ data: Object.values(response.json)[1] })),

    delete: (resource, params) =>
        httpClient(`${resource}/${params.id}`, {
            method: 'DELETE',
        })
        .then(response => ({ data: Object.values(response.json)[1] })),
}