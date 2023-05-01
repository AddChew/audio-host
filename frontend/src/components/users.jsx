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
    PasswordInput,
    Create,
    useRecordContext,
    BooleanField,
    required
} from 'react-admin'

const UserTitle = () => {
    const record = useRecordContext()
    return <span>{ record ? `${record.username}` : '' }</span>
}

export const UserList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="username" sortable={ false } />
            <BooleanField source="isAdmin" sortable={ false } />
            <DateField source="createdAt" sortable={ false } showTime />
            <DateField source="updatedAt" sortable={ false } showTime />
            <EditButton />
        </Datagrid>
    </List>
)

export const UserEdit = () => (
    <Edit title={ <UserTitle />}> 
        <SimpleForm>
            <TextInput source="username" disabled />
            <PasswordInput source="password" />
            <BooleanInput source="isAdmin" />
        </SimpleForm>
    </Edit>
)

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="username" validate={ required() } />
            <PasswordInput source="password" validate={ required() } />
            <BooleanInput source="isAdmin" validate={ required() } />
        </SimpleForm>
    </Create>
)