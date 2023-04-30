import { Datagrid, DateField, List, TextField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="username" sortable={ false } />
            <DateField source="createdAt" sortable={ false } />
            <DateField source="updatedAt" sortable={ false } />
        </Datagrid>
    </List>
)

// TODO: create custom field for audio files, load the blob and play file