import { fetchUtils } from 'react-admin'

const apiUrl = 'https://localhost:3000' 
const httpClient = fetchUtils.fetchJson

export default { // TODO: figure out how to write data provider
    getOne: (resource, params) => 
        httpClient(`${apiUrl}/${resource}/${params.uuid}`).then(({ json }) => ({
            data: json
        }))
}