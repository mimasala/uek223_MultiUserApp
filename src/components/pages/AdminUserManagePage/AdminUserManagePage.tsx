import * as React from 'react';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import UserAccordionEntry from '../../organisms/UserAccordionEntry/UserAccordionEntry';
import { Dialog, DialogContent, DialogTitle, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserForm from '../../molecules/UserForm/UserForm';
import { useStyles } from './AdminUserManagePage.style';

const AdminUserManagePage = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [users, setUsers] = React.useState<User[]>([]);
    const [addUserDialog, setAddUserDialog] = React.useState<boolean>(false);
    const adminStyles = useStyles();

    React.useEffect(() => {
        UserService.getAllUsers().then(response => {
            setUsers(response)
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
        <div className={adminStyles.contentDiv}>
      {
        users.map((user, key) => {
            return <UserAccordionEntry key={key} expanded={expanded} setExpanded={setExpanded} pannelId={key} user={user} />
        })
      }
        <Fab color="primary" aria-label="add" className={adminStyles.fab} onClick={handleAddUser}>
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
      </Dialog>
    </div>
    );
}

export default AdminUserManagePage;