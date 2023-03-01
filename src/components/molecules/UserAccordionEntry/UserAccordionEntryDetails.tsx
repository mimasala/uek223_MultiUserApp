import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import React from 'react';
import UserService from '../../../Services/UserService';
import { User } from '../../../types/models/User.model';
import UserForm from '../UserForm/UserForm';

type PropType = {
    user: User
}

const UserAccordionEntryDetails = ({ user }: PropType) => {
    const [openConfirmDelete, setOpenConfirmDelete] = React.useState<boolean>(false);
    const [openEditUser, setOpenEditUser] = React.useState<boolean>(false);

    const handleDeleteUser = () => {
        UserService.deleteUser(user.id)
            .then(response => {
                setOpenConfirmDelete(false);
                console.log("Successfull deletion."); //TODO refresh list.
            })
    }

    const handleSubmitEditUser = ( user: User ) => {
        UserService.updateUser(user)
            .then(response => {
                setOpenEditUser(false);
                console.log("Successfull edit");
            })
    } 

    return (
        <div>
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

                            <Stack spacing={1} direction="row" >
                                <Button variant="contained" onClick={() => setOpenEditUser(true)}>Edit</Button>
                                <Button variant="contained" color="error" onClick={() => setOpenConfirmDelete(true)}>Delete</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
        </AccordionDetails>
        

        <Dialog
        open={openEditUser}
        onClose={() => setOpenConfirmDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit " + user.firstName}
        </DialogTitle>
        <DialogContent>
          <UserForm user={user} 
            cancelActionHandler={() => setOpenEditUser(false)}
            submitActionHandler={handleSubmitEditUser} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

        <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete " + user.firstName + "?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All the events created by {user.firstName} will be deleted as well.
            There is no way to undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button onClick={handleDeleteUser} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      </div>
    ); 
}

export default UserAccordionEntryDetails;