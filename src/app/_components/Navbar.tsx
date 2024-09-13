"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import { signOut } from 'next-auth/react';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [loading, setLoading] = React.useState(false);
    const BackendLogout = async () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            url: `http://localhost:3000/api/auth/logout/`,
            data: {},
        };
        axios(requestOptions)
            .then(async () => {
                await signOut()
                    .then(() => {
                        setLoading(false)
                        window.location.replace('http://localhost:3000/auth/login');
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                        window.location.replace('http://localhost:3000/auth/login');
                    })
            })
            .catch(async (error) => {
                // ErrorHandler(error, error.response.data.message, 'single', 'error')
                await signOut()
                    .then(() => {
                        setLoading(false)
                        window.location.replace('http://localhost:3000/auth/login');
                    })
                    .catch(() => {
                        setLoading(false)
                        window.location.replace('http://localhost:3000/auth/login');
                    })
            });
    };

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

    return (
        <AppBar position="static" sx={{
            backgroundColor: '#000', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)'  // Subtle white shadow
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PREPSTER AI
                    </Typography>

                    {/* Centered Nav Links */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                mx: 2,
                                position: 'relative', // Needed for the underline effect
                                '&:hover': {
                                    color: '#2663eb',
                                    fontWeight: 600,
                                    transform: 'translateY(-3px)', // Slightly lift the text up
                                    transition: 'all 0.3s ease', // Smooth transition for the lift
                                },
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '3px', // Height of the underline
                                    bottom: 0,
                                    left: 0,
                                    background: 'linear-gradient(to right, #2663eb, #4facfe)', // Gradient underline
                                    transform: 'scaleX(0)',
                                    transition: 'transform 0.3s ease', // Animate the underline
                                    transformOrigin: 'bottom right',
                                },
                                '&:hover:after': {
                                    transform: 'scaleX(1)', // Show underline on hover
                                    transformOrigin: 'bottom left', // Animate from left to right
                                }
                            }}
                        >
                            Dashboard
                        </Button>



                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                mx: 2,
                                position: 'relative', // Needed for the underline effect
                                '&:hover': {
                                    color: '#2663eb',
                                    fontWeight: 600,
                                    transform: 'translateY(-3px)', // Slightly lift the text up
                                    transition: 'all 0.3s ease', // Smooth transition for the lift
                                },
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '3px', // Height of the underline
                                    bottom: 0,
                                    left: 0,
                                    background: 'linear-gradient(to right, #2663eb, #4facfe)', // Gradient underline
                                    transform: 'scaleX(0)',
                                    transition: 'transform 0.3s ease', // Animate the underline
                                    transformOrigin: 'bottom right',
                                },
                                '&:hover:after': {
                                    transform: 'scaleX(1)', // Show underline on hover
                                    transformOrigin: 'bottom left', // Animate from left to right
                                }
                            }}
                        >
                            Pricing
                        </Button>


                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                mx: 2,
                                position: 'relative', // Needed for the underline effect
                                '&:hover': {
                                    color: '#2663eb',
                                    fontWeight: 600,
                                    transform: 'translateY(-3px)', // Slightly lift the text up
                                    transition: 'all 0.3s ease', // Smooth transition for the lift
                                },
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '3px', // Height of the underline
                                    bottom: 0,
                                    left: 0,
                                    background: 'linear-gradient(to right, #2663eb, #4facfe)', // Gradient underline
                                    transform: 'scaleX(0)',
                                    transition: 'transform 0.3s ease', // Animate the underline
                                    transformOrigin: 'bottom right',
                                },
                                '&:hover:after': {
                                    transform: 'scaleX(1)', // Show underline on hover
                                    transformOrigin: 'bottom left', // Animate from left to right
                                }
                            }}
                        >
                            Contact Us
                        </Button>

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
                            <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                                </MenuItem>
                             <MenuItem onClick={BackendLogout}>
                                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                                </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
