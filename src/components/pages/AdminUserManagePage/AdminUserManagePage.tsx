import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import UserAccordionEntry from '../../organisms/UserAccordionEntry/UserAccordionEntry';

const AdminUserManagePage = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        UserService.getAllUsers().then(response => {
            setUsers(response.data)
        })
    }, []);


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
    </div>
    );
}

export default AdminUserManagePage;