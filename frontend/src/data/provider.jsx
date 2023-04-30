import { fetchUtils } from 'react-admin'
import api from './api'

const httpClient = fetchUtils.fetchJson

export default { // TODO: figure out how to write data provider
    getList: (resource, params) => {
        const { limit, offset } = params.pagination // TODO: add pagination
        const url = `${api.root}/${resource}`
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