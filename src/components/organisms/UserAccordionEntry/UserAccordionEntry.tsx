import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { User } from '../../../types/models/User.model';
import UserAccordionEntryDetails from '../../molecules/UserAccordionEntry/UserAccordionEntryDetails';

type PropType = {
    expanded: string | false,
    setExpanded(expanded: string | false): void,
    pannelId: number,
    user: User
}

const UserAccordionEntry = ({ expanded, setExpanded, pannelId, user } : PropType) => {
    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

    return (
        <Accordion expanded={expanded === `pannel${pannelId}`} onChange={handleChange(`pannel${pannelId}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${pannelId}bh-content`}
          id={`panel${pannelId}bh-header`}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {user.email}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{user.firstName} {user.lastName}</Typography>

        </AccordionSummary>
    
        <UserAccordionEntryDetails user={user} />
      </Accordion>
    );
}

export default UserAccordionEntry;