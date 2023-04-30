import { fetchUtils } from 'react-admin'
import api from './api'

const httpClient = fetchUtils.fetchJson

export default { // TODO: figure out how to write data provider
    getOne: (resource, params) => 
        httpClient(`${api.root}/${resource}/${params.uuid}`).then(({ json }) => ({
            data: json
        }))
}