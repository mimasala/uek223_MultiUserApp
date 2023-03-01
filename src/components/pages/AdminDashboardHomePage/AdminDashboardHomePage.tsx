import { Box, Container, Grid, Link, Pagination, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import { EventRecommendation } from "../../../types/models/EventRecommendation.model";
import EventCard from "../../molecules/EventCard/EventCard";

const AdminDashboardHomePage = () => {

    return (
        <Container fixed >
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', textAlign: 'center',  overflow: 'auto', marginBottom: "20%"}} >
            <h1>Admin Dashboard</h1>
            <Container maxWidth="md" >
              <Link href="/admin/users">Users</Link>
              <Link href="/admin/events">Events</Link>
            </Container>
        </Box>
      </Container>
    );
}

export default AdminDashboardHomePage;