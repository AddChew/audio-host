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
        httpClient(`/${resource}/${params.id}`).then(({ json }) => ({
            data: json
        }))
}