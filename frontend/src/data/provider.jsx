import { fetchUtils } from 'react-admin'
import api from './api'

const httpClient = fetchUtils.fetchJson

export default { // TODO: figure out how to write data provider
    getList: (resource, params) => {
        const { page, perPage } = params.pagination
        const offset = (page - 1) * perPage
        const url = `${api.root}/${resource}?limit=${perPage}&offset=${offset}`
        return httpClient(url)
            .then(response => response.json)
            .then(({ count, users }) => {
            return {
                data: users,
                total: count
            }
            })
    },

    getOne: (resource, params) => 
        httpClient(`${api.root}/${resource}/${params.id}`).then(({ json }) => ({
            data: json
        }))
}