import { 
    Datagrid, 
    DateField, 
    List, 
    TextField, 
    Create, 
    SimpleForm, 
    TextInput,
    FileInput,
    FileField,
    useRecordContext
} from 'react-admin'
import { UserCreate } from './users'

export const FileList = () => (
    <List>
        <Datagrid>
            <TextField source="filename" sortable={ false } />
            <TextField source="description" sortable={ false } />
            <TextField source="category" sortable={ false } />
            <DateField source="createdAt" sortable={ false } />
            <DateField source="updatedAt" sortable={ false } />
        </Datagrid>
    </List>
)

const FileInputMessage = () => (
    <div>
        <p>Drop a file to upload, or click to select it.</p>
        <p style={{ fontSize: 12 }}>Max upload size: 25MB</p>
    </div>
)

const AudioField = (props) => {
    const record = useRecordContext(props)
    return record ? <div><audio controls><source src={record.src} /></audio> </div>: null
}

export const FileCreate = () => (
    <Create>
        <SimpleForm>
            <FileInput source="content" accept="audio/*" maxSize={25000000} placeholder={ <FileInputMessage /> }>
                <>
                <FileField source="src" title="title" />
                <AudioField source="src" title="title" />
                </>
            </FileInput>
            <TextInput source="filename" />
            <TextInput source="description" />
            <TextInput source="category" />
        </SimpleForm>
    </Create>
)