import { Admin, Resource } from 'react-admin'
import dataProvider from './data/provider'
import { UserList, UserEdit } from './components/users'
import { FileList } from './components/files'
import authProvider from './data/authProvider'
// TODO: we can if else here to show different stuff for admin and non admin
const App = () => (
    <Admin authProvider={ authProvider } dataProvider={ dataProvider }>
        <Resource name="users" list={ UserList } edit={ UserEdit } />
        <Resource name="files" list={ FileList } />
    </Admin>
)

export default App
