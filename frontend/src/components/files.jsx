import { 
    Datagrid, 
    DateField, 
    List, 
    TextField, 
    Create, 
    SimpleForm, 
    TextInput,
    FileInput
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

export const FileCreate = () => (
    <Create>
        <SimpleForm>
            <FileInput source="content" />
            <TextInput source="filename" />
            <TextInput source="description" />
            <TextInput source="category" />
        </SimpleForm>
    </Create>
)