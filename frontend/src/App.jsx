import { Admin, Resource, ListGuesser } from 'react-admin'
import dataProvider from './data/provider'
import { authProvider } from './data/authProvider'

const App = () => (
    <Admin authProvider={ authProvider } dataProvider={ dataProvider }>
        <Resource name="users" list={ ListGuesser } />
    </Admin>
)

export default App
