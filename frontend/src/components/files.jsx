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
    ShowButton
} from 'react-admin'
import * as React from "react"

export const FileList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="filename" sortable={ false } />
            <TextField source="description" sortable={ false } />
            <TextField source="category" sortable={ false } />
            <DateField source="createdAt" sortable={ false } />
            <DateField source="updatedAt" sortable={ false } />
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

const FileTitle = () => {
    const record = useRecordContext()
    return <span>{ record ? `${record.filename}` : '' }</span>
}

// const ShowAudioField = (props) => {
//     const record = useRecordContext(props)
//     // console.log(URL.createObjectURL(record.content.data))
//     return record ? <div><audio controls><source src={record.content} /></audio> </div>: null
// }

export const FileShow = () => (
    <Show title={ <FileTitle />}>
        <SimpleShowLayout>
            <TextField source="filename" />
            <TextField source="description" />
            <TextField source="category" />
            <DateField source="createdAt" />
            {/* <ShowAudioField source="content" /> */}
        </SimpleShowLayout>
    </Show>
)

// TODO: fix file upload issue