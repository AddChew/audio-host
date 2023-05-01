import { useGetIdentity } from "react-admin"
import { Card, CardHeader } from "@mui/material"

export const Dashboard = () => {
    const { data, isLoading } = useGetIdentity()
    if (isLoading) return <>Loading...</>
    return (
        <Card>
            <CardHeader title={ data.fullName } />
        </Card>
    )
}