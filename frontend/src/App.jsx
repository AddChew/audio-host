import { Admin, Resource } from 'react-admin'
import dataProvider from './data/provider'
import { UserList, UserEdit, UserCreate } from './components/users'
import { FileList, FileCreate } from './components/files'
import authProvider from './data/authProvider'
import UserIcon from '@mui/icons-material/Group'
import AudioFileIcon from '@mui/icons-material/AudioFile'

// TODO: we can if else here to show different stuff for admin and non admin
const App = () => (
    <Admin authProvider={ authProvider } dataProvider={ dataProvider }>
        <Resource name="files" list={ FileList } create={ FileCreate } icon={ AudioFileIcon }/>
        <Resource name="users" list={ UserList } edit={ UserEdit } create={ UserCreate } icon={ UserIcon } />
    </Admin>
)

export default App
