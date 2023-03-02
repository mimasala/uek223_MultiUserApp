import { Avatar, Button, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import ParticipationService from "../../Services/ParticipationService";
import UserService from "../../Services/UserService";
import { User } from "../../types/models/User.model";

interface ParticipantsProps {
    openAddPeople: boolean;
    setOpenAddPeople: React.Dispatch<React.SetStateAction<boolean>>;
    createdEventId: string;
  }
const AddParticipantsDialog = ({ openAddPeople, setOpenAddPeople, createdEventId }: ParticipantsProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [addedUsers, setAddedUsers] = useState<User[]>([]);
  
    const handleListItemClick = (value: User) => {
        let copyOfAddedUsers = [...addedUsers];
        const index = copyOfAddedUsers.indexOf(value, 0);
        if (index > -1) {
          copyOfAddedUsers.splice(index, 1);
        } else {
          copyOfAddedUsers.push(value);
        }
        
        setAddedUsers(copyOfAddedUsers);
      };

      const handleSubmitAddUsers = () => {
        ParticipationService.signManyUserUpForEvent(createdEventId, addedUsers.map(user => user.id))
        .then(res => {
          setOpenAddPeople(false);
        })
      }
      const handleCloseUser = () => {
        setOpenAddPeople(false);
      };
      
      useEffect(() => { 
        return () => {
          UserService.getAllUsers().then((data) => {
            setUsers(data.filter(user => {
              console.log(user);
              if(user.roles.filter(role => role.name === "ADMIN").length > 0) {
                    return false;
                }
              return true;
            }));
          });
        }
      }, [])

  return (
    <>
    <Dialog onClose={handleCloseUser} open={openAddPeople}>
      <DialogTitle>Add event participants</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItem disableGutters sx={{
             backgroundColor: (addedUsers.indexOf(user, 0) === -1 ? "#FFF" : "#DDD")
          }}>
            <ListItemButton onClick={() => handleListItemClick(user)} key={user.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.email} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSubmitAddUsers} variant="contained">Submit</Button>
    </Dialog>
</>
  );
};
export default AddParticipantsDialog;
