import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import UserAccordionEntry from '../../organisms/UserAccordionEntry/UserAccordionEntry';
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserForm from '../../molecules/UserForm/UserForm';

const AdminUserManagePage = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [users, setUsers] = React.useState<User[]>([]);
    const [addUserDialog, setAddUserDialog] = React.useState<boolean>(false);

    React.useEffect(() => {
        UserService.getAllUsers().then(response => {
            setUsers(response.data)
        })
    }, []);
    
    const handleAddUser = () => {
        setAddUserDialog(true);
    }

    const handleSubmitAddUser = (user: User) => {
        UserService.addUser(user).then(response => {
            setAddUserDialog(false);
        });
    }

    return (
        <div style= {{
            marginLeft: "20px",
            marginRight: "20px"
        }}>
      {
        users.map((user, key) => {
            return <UserAccordionEntry expanded={expanded} setExpanded={setExpanded} pannelId={key} user={user} />
        })
      }
        <Fab color="primary" aria-label="add" style={{
            position: "fixed", bottom: "75px", right: "10px"
        }} onClick={handleAddUser}>
            <AddIcon />
        </Fab>

        <Dialog
        open={addUserDialog}
        onClose={() => setAddUserDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add new user"}
        </DialogTitle>
        <DialogContent>
          <UserForm user={{"email": '', "firstName": '', "lastName": '', "id": '', "roles": []}}
            cancelActionHandler={() => setAddUserDialog(false)}
            submitActionHandler={handleSubmitAddUser} isAllowedEditRoles={true}
            showPasswordField={true} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default AdminUserManagePage;