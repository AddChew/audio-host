import { Admin, Resource, ListGuesser } from 'react-admin'
import dataProvider from './data/provider'
import { UserList } from './components/users'
import authProvider from './data/authProvider'

const App = () => (
    <Admin authProvider={ authProvider } dataProvider={ dataProvider }>
        <Resource name="users" list={ UserList } />
        <Resource name="files" list={ ListGuesser } />
    </Admin>
)

export default App
