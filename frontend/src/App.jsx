import { Admin, Resource } from 'react-admin'
import dataProvider from './data/provider'
import { Dashboard } from './components/dashboard'
import { UserList, UserEdit, UserCreate, UserShow } from './components/users'
import { FileList, FileCreate, FileShow } from './components/files'
import authProvider from './data/authProvider'
import UserIcon from '@mui/icons-material/Group'
import AudioFileIcon from '@mui/icons-material/AudioFile'

const App = () => (
    <Admin authProvider={ authProvider } dataProvider={ dataProvider } dashboard={ Dashboard }>
        <Resource name="files" list={ FileList } create={ FileCreate } icon={ AudioFileIcon } show={ FileShow } />
        {permissions => (
            <>
            {permissions.isAdmin ? <Resource name="users" list={ UserList } edit={ UserEdit } create={ UserCreate } icon={ UserIcon } show={ UserShow }/> : null}
            </>
        )}
    </Admin>
)

export default App
