import { Admin, Resource } from 'react-admin'
import dataProvider from './data/provider'
import { UserList } from './components/users'
import { authProvider } from './data/authProvider'

const App = () => (
    <Admin authProvider={ authProvider } dataProvider={ dataProvider }>
        <Resource name="users" list={ UserList } />
    </Admin>
)

export default App
