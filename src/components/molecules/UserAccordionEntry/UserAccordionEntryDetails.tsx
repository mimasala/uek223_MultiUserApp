import { Button, Chip, Grid, Paper, Stack } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { User } from '../../../types/models/User.model';

type PropType = {
    user: User
}

const UserAccordionEntryDetails = ({ user }: PropType) => {
    return (
        <AccordionDetails>
            <Grid container xs={12}>
                <Grid md={2} xs={12} sx={{
                    paddingRight: "10px",
                    marginRight: "10px",
                    borderRight: "2px gray solid"
                }}>
                    <Stack spacing={1} direction="column">
                        <Paper sx={{
                            padding: "10px",
                        }}>
                            <Typography>Interests</Typography>
                            <Chip label="Fun" />
                            <Chip label="Food" />
                            <Chip label="Dancing" />
                        </Paper>
                    </Stack>
                </Grid>
                <Grid md={6} xs={12}>
                    <Stack spacing={1} direction="column">
                        <Paper sx={{
                            padding: "10px",
                        }}>
                            <Typography>Roles</Typography>
                            {
                                user.roles.map((role) => <Chip label={role.name} />)
                            }
                        </Paper>
                        
                        <div>
                            <Button variant="contained">Edit</Button>
                            <Button variant="contained" color="error">Delete</Button>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
      </AccordionDetails>
    ); 
}

export default UserAccordionEntryDetails;