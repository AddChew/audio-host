import { Datagrid, DateField, List, TextField } from 'react-admin';

export const FileList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="filename" sortable={ false } />
            <TextField source="description" sortable={ false } />
            <TextField source="category" sortable={ false } />
            <DateField source="createdAt" sortable={ false } />
            <DateField source="updatedAt" sortable={ false } />
        </Datagrid>
    </List>
);