import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext, useEffect, useState } from "react";
import InterestsIcon from '@mui/icons-material/Interests';
import { useNavigate } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import roles from "../../../config/Roles";


type Page = {
  pageName: string, onClick: () => void
}


const NavBar = () => {
  const navigate = useNavigate();
  const context = useContext(ActiveUserContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isAdmin, setIsAdmin] = useState(false)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages: Page[] = [{ pageName: "Home", onClick: () => { return navigate("/") } }, { pageName: 'Events', onClick: () => { return navigate("/events") } }, { pageName: 'About', onClick: () => { return navigate("/") } }];
  // if time basic profile page
  const settings: Page[] = [{ pageName: 'Profile', onClick: () => { return navigate("/profile") } }, { pageName: 'Own Events', onClick: () => { return navigate("/ownevents") } }, { pageName: 'Logout', onClick: () => { return context.logout() } }];
  const adminPages: Page[] = [
    { pageName: "MANAGE", onClick: () => { return navigate("/admin") } },
  ]
  useEffect(() => {
    if (context.user){
      setIsAdmin(context.user!.roles.some(role => role.name === roles.ADMIN))
    }
  }, [])

  return (
    <AppBar position="static" sx={{ backgroundImage: "linear-gradient(gray, black)" }}>
      <Container maxWidth="xl" sx={{ width: "60%" }}>
        <Toolbar disableGutters >
          <InterestsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 35,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OurSpace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem data-cy="hello" key={page.pageName} onClick={page.onClick}>
                  <Typography textAlign={"center"}>
                    {page.pageName}
                  </Typography>
                </MenuItem>
              ))}
              {isAdmin &&
                adminPages.map((page) => (
                  <MenuItem id={page.pageName} key={page.pageName} onClick={page.onClick}>
                    <Typography textAlign={"center"}>
                      {page.pageName}
                    </Typography>
                  </MenuItem>
                ))
                }
                <MenuItem id="test" key="test">
                  <Typography textAlign={"center"}>
                    {"test"}
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
          <InterestsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.pageName}
                onClick={page.onClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.pageName}
              </Button>
            ))}
            {isAdmin &&
              adminPages.map((page) => (
                <MenuItem key={page.pageName} onClick={page.onClick}>
                  <Typography textAlign={"center"}>
                    {page.pageName}
                  </Typography>
                </MenuItem>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.pageName} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.pageName}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
