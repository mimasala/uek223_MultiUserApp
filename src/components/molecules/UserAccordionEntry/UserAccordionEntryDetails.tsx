import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';
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
    const [interests, setInterests] = React.useState<String[]>([]);

    React.useEffect(() => {
        axios.get("http://localhost:8088/api/user/"+user.id).then(response => {
            setInterests(response.data.Labels)
        })
    }, [])

    const handleDeleteUser = () => {
        UserService.deleteUser(user.id)
            .then(response => {
                setOpenConfirmDelete(false);
                console.log("Successfull deletion."); //TODO refresh list.
            })
    }

    const handleSubmitEditUser = ( user: User ) => {
        UserService.updateUser({"email": user.email, "firstName": user.firstName, "lastName": user.lastName, "id": user.id, "roles": user.roles}) //if we don't do this, the password will be set to <null>
            .then(response => {
                setOpenEditUser(false);
                console.log("Successfull edit");
            })
    } 

    return (
        <div>
            <AccordionDetails>
                <Grid container xs={12}>
                    <Grid md={5} xs={12} sx={{
                        paddingRight: "10px",
                        marginRight: "10px",
                        borderRight: "2px gray solid"
                    }}>
                        <Stack spacing={1} direction="column">
                            <Paper sx={{
                                padding: "10px",
                            }}>
                                <Typography>Interests</Typography>
                                {
                                    interests.map((interest) => <Chip label={interest} />)
                                }
                                {
                                    interests.length == 0 ?
                                        <>
                                            <Chip label="Fun" />
                                            <Chip label="Food" />
                                            <Chip label="Dancing" />
                                        </> :
                                            <></>
                                }
                            </Paper>
                        </Stack>
                    </Grid>
                    <Grid md={5} xs={12}>
                        <Stack spacing={1} direction="column">
                            <Paper sx={{
                                padding: "10px",
                            }}>
                                <Typography>Roles</Typography>
                                {
                                    user.roles.map((role) => <Chip label={role.name} />)
                                }
                            </Paper>

                            
                        </Stack>
                    </Grid>
                    <Grid md={1} sx={{marginLeft: "10px", display: "grid", placeItems: "center"}}>
                        <Stack spacing={1} direction="row" >
                            <Button variant="contained" onClick={() => setOpenEditUser(true)}>Edit</Button>
                            <Button variant="contained" color="error" onClick={() => setOpenConfirmDelete(true)}>Delete</Button>
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
            submitActionHandler={handleSubmitEditUser} isAllowedEditRoles={true}/>
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