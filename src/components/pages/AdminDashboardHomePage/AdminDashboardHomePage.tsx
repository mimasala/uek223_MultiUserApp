import { Box, Container, Link, } from "@mui/material";


const AdminDashboardHomePage = () => {

    return (
        <Container fixed >
        <Box sx={{  height: '90vh', textAlign: 'center',  overflow: 'auto', marginBottom: "20%"}} >
            <h1>Admin Dashboard</h1>
            <Container maxWidth="md" >
              <Link id="manageusers" href="/admin/users">Manage Users</Link>
              <br/>
              <Link id="manageevents" href="/admin/events">Manage Events</Link>
            </Container>
        </Box>
      </Container>
    );
}

export default AdminDashboardHomePage;