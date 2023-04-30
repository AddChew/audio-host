import { 
    Datagrid, 
    DateField, 
    List, 
    TextField, 
    EditButton,
    BooleanInput, 
    Edit, 
    SimpleForm, 
    TextInput,
    PasswordInput
} from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="username" sortable={ false } />
            <DateField source="createdAt" sortable={ false } />
            <DateField source="updatedAt" sortable={ false } />
            <EditButton />
        </Datagrid>
    </List>
)

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="username" />
            <BooleanInput source="isAdmin" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
)

// TODO: create custom field for audio files, load the blob and play file