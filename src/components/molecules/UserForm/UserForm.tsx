import { useFormik } from 'formik';
import { User } from '../../../types/models/User.model';
import { Box, Button, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import React, { useEffect } from 'react';
import { Role } from '../../../types/models/Role.model';
import RoleService from '../../../Services/RoleService';

interface UserProps {
  user: User;
  submitActionHandler: (values: User) => void;
  cancelActionHandler?: () => void;
  isAllowedEditRoles: boolean;
  showPasswordField: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const UserForm = ({ user, submitActionHandler, cancelActionHandler, isAllowedEditRoles, showPasswordField }: UserProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [roles, setRoles] = React.useState<Role[]>([]);
  
  React.useEffect(() => {
    RoleService.findAll().then(response => {
      setRoles(response.data);
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      id: user.id,
      lastName: user ? user.lastName : '',
      firstName: user ? user.firstName : '',
      email: user ? user.email : '',
      roles: [],
      password: '',
    },
    validationSchema: object({
      firstName: string().required().min(2).max(50),
      lastName: string().required().min(2).max(50),
      email: string().required().email(),
      password: string().optional().min(8).max(50)
    }),
    onSubmit: (values: User) => {
      values.roles = values.roles.map(role => typeof role === "string" ? JSON.parse(role) : role)
      submitActionHandler(values);
    },
    enableReinitialize: true,
  });

  
 
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ paddingTop: '15px' }}>
          <TextField
            id='firstName'
            label='Firstname'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
          ) : null}
          <TextField
            id='lastName'
            label='Lastname'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
          ) : null}
          <TextField
            id='email'
            label='E-Mail'
            variant='outlined'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.email && formik.errors.email)}
            value={formik.values.email}
          />
          { showPasswordField &&
          <TextField
            id='password'
            label='password'
            variant='outlined'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.password && formik.errors.password)}
            value={formik.values.password}
          />}
          { isAllowedEditRoles &&
            <Select
            labelId="roles"
            id="roles"
            name="roles"
            multiple
            value={formik.values.roles}
            onChange={formik.handleChange}
            input={<OutlinedInput id="roles-2" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip label={(typeof value === "string" ? JSON.parse(value) : value).name} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            >
            {roles.map((role) => (
              <MenuItem
                key={role.id}
                value={JSON.stringify(role)}
                style={getStyles(role.name, personName, theme)}
              >
                {role.name}
              </MenuItem>
            ))}
          </Select>
          }        

          {formik.errors.email && formik.touched.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
        </Box>
        <div>
          <Button
            sx={{ marginTop: '15px', marginRight: '10px' }}
            variant='contained'
            color='success'
            type='submit'
            disabled={!(formik.dirty && formik.isValid)}
          >
            {user.id && 'Save'}
            {!user.id && 'Add'}
          </Button>
          <Button
            sx={{ marginTop: '15px' }}
            variant='contained'
            color='error'
            onClick={cancelActionHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
