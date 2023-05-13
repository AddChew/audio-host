import { fetchUtils } from 'react-admin'

const httpClient = fetchUtils.fetchJson
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file.rawFile)
    })

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const offset = (page - 1) * perPage
        const url = `/${resource}?sort=["${field}","${order}"]&limit=${perPage}&offset=${offset}`
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
                return { ...params.data, content: base64File }
            })
            .then(data => {
                let formData = new FormData()
                formData.append('filename', data.filename)
                formData.append('description', data.description)
                formData.append('category', data.category)
                formData.append('content', data.content)
                return httpClient(`/${resource}`, {
                    method: 'POST',
                    body: formData
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