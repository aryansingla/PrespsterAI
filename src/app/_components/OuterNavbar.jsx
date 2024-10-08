"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function OuterNavbar() {
    const isScreenSmall = useMediaQuery('(max-width:1000px)');
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const router = useRouter();



    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleDashboardClick = () => {
        router.push('/dashboard');
    }

    const handlePricingClick = () => {
        router.push('/pricing');
    }

    const handleContactUsClick = () => {
        router.push('/contact-us');
    }

    const handleLoginClick = () => {
        router.push('/auth/login');
    }

    const handleSignupClick = () => {
        router.push('/auth/signup');
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const DrawerList = (
        <Box sx={{ width: 280, height: '100%' }} role="presentation" onClick={toggleDrawer(false)}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', paddingX: '16px' }}>
                <Typography sx={{ fontWeight: '600', color: '#fff', fontSize: '22px' }}>
                    PREPSTER AI
                </Typography>
                <CloseIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={toggleDrawer(false)} />
            </Box>
            <List sx={{ color: '#fff', marginTop: '30px' }}>
                <ListItem key="1" disablePadding
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
                        },
                    }}>
                    <ListItemButton onClick={handleDashboardClick}>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="2" disablePadding
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
                    }}>
                    <ListItemButton onClick={handlePricingClick}>
                        {/* <ListItemIcon>
                            <AttachMoneyIcon sx={{ color: '#fff' }} />
                        </ListItemIcon> */}
                        <ListItemText primary="Pricing" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="3" disablePadding
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
                    }}>
                    <ListItemButton onClick={handleContactUsClick}>
                        {/* <ListItemIcon>
                            <EmailIcon sx={{ color: '#fff' }} />
                        </ListItemIcon> */}
                        <ListItemText primary="Contact Us" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="4" disablePadding
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
                    }}>
                    <ListItemButton onClick={handleLoginClick}>
                        {/* <ListItemIcon>
                            <EmailIcon sx={{ color: '#fff' }} />
                        </ListItemIcon> */}
                        <ListItemText primary="Login" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="5" disablePadding
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
                    }}>
                    <ListItemButton onClick={handleSignupClick}>
                        {/* <ListItemIcon>
                            <EmailIcon sx={{ color: '#fff' }} />
                        </ListItemIcon> */}
                        <ListItemText primary="Signup" />
                    </ListItemButton>
                </ListItem>
           
            </List>

        </Box>
    );


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
                            display: isScreenSmall ? 'none' : 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PREPSTER AI
                    </Typography>
                    <Box>
                        <MenuIcon
                            onClick={toggleDrawer(true)}
                            sx={{ fontSize: 40, display: isScreenSmall ? 'flex' : 'none', cursor: 'pointer' }} />
                    </Box>



                    {/* Centered Nav Links */}
                    <Box sx={{ flexGrow: 1, display: isScreenSmall ? 'none' : 'flex', justifyContent: 'center' }}>
                        
                        <Button
                            onClick={handleDashboardClick}
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
                            onClick={handlePricingClick}
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
                            onClick={handleContactUsClick}
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


                    <Box sx={{ flexGrow: 0, display: isScreenSmall ? 'none' : 'flex', justifyContent: 'flex-end', marginLeft: 'auto',gap:2 }}>
                        <Link href="/auth/login">
                        <Button 
                            color="secondary"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{backgroundColor:'#07153e'}}
                        >
                            Login
                        </Button>
                        </Link>
                        <Link href="/auth/signup">
                        <Button 
                            color="secondary"
                            variant="contained"
                            size="large"
                            fullWidth
                        >
                            Signup
                        </Button>
                        </Link>

                    </Box>

                    <Box sx={{ flexGrow: 0, display: isScreenSmall ? 'flex' : 'none', justifyContent: 'flex-end', marginLeft: 'auto',gap:2 }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            // mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PREPSTER AI
                    </Typography>

                    </Box>

                </Toolbar>
            </Container>
            <Drawer open={open} onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: 'black',  // Set the background color to black
                        boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)',  // Add a subtle white box shadow
                        width: 300,  // Control the width of the drawer
                    },
                }}
            >
                {DrawerList}
            </Drawer>
        </AppBar>

    );
}
export default OuterNavbar;
