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
    useRecordContext,
    Show,
    SimpleShowLayout,
    ShowButton,
    required
} from 'react-admin'
import * as React from "react"

export const FileList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="filename" />
            <TextField source="description" />
            <TextField source="category" />
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
            <ShowButton />
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
            <FileInput source="content" accept="audio/*" maxSize={25000000} placeholder={ <FileInputMessage /> } validate={ required() }>
                <>
                <FileField source="src" title="title" />
                <AudioField source="src" title="title" />
                </>
            </FileInput>
            <TextInput source="filename" validate={ required() } />
            <TextInput source="description" validate={ required() } />
            <TextInput source="category" validate={ required() } />
        </SimpleForm>
    </Create>
)

const FileTitle = () => {
    const record = useRecordContext()
    return <span>{ record ? `${record.filename}` : '' }</span>
}

const ShowAudioField = (props) => {
    const record = useRecordContext(props)
    return record.content ? <div><audio controls><source src={record.content} /></audio> </div>: null
}

export const FileShow = () => (
    <Show title={ <FileTitle />}>
        <SimpleShowLayout>
            <TextField source="filename" />
            <TextField source="description" />
            <TextField source="category" />
            <DateField source="createdAt" showTime />
            <ShowAudioField source="content" />
        </SimpleShowLayout>
    </Show>
)