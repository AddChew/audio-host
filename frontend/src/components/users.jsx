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
    required,
    Show,
    SimpleShowLayout,
    ShowButton
} from 'react-admin'

const UserTitle = () => {
    const record = useRecordContext()
    return <span>{ record ? `${record.username}` : '' }</span>
}

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="username" />
            <BooleanField source="isAdmin" />
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
            <ShowButton />
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

export const UserShow = () => (
    <Show title={ <UserTitle />}>
        <SimpleShowLayout>
            <TextField source="username" />
            <BooleanField source="isAdmin" />
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
        </SimpleShowLayout>
    </Show>
)