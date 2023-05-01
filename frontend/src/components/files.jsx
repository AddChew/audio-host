import { 
    Datagrid, 
    DateField, 
    List, 
    TextField, 
    Create, 
    SimpleForm, 
    TextInput,
    FileInput,
    FileField
} from 'react-admin'

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

export const FileCreate = () => (
    <Create>
        <SimpleForm>
            <FileInput source="content" accept="audio/*" maxSize={25000000} placeholder={ <FileInputMessage /> }>
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="filename" />
            <TextInput source="description" />
            <TextInput source="category" />
        </SimpleForm>
    </Create>
)