import { Box, Container, Link, } from "@mui/material";


const AdminDashboardHomePage = () => {

    return (
        <Container fixed >
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', textAlign: 'center',  overflow: 'auto', marginBottom: "20%"}} >
            <h1>Admin Dashboard</h1>
            <Container maxWidth="md" >
              <Link href="/admin/users">Users</Link>
              <br/>
              <Link href="/admin/events">Events</Link>
            </Container>
        </Box>
      </Container>
    );
}

export default AdminDashboardHomePage;