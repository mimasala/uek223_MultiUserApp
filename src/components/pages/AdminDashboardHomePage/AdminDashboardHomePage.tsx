import { Box, Container, Link, } from "@mui/material";
import { useStyles } from "./AdminDashboardHomePage.style";


const AdminDashboardHomePage = () => {
  const adminStyles = useStyles();
    return (
        <Container fixed >
        <Box className={adminStyles.contentBox} >
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