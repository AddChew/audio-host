import { fetchUtils } from 'react-admin'

const httpClient = fetchUtils.fetchJson

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

    update: (resource, params) =>
        httpClient(`/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        .then(response => ({ data: Object.values(response.json)[1] }))
}