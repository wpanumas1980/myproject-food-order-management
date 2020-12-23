import React, { useState, useContext, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { ButtonGroup } from '@material-ui/core';
import { AuthContext } from "../../auth/Auth";
import { firestore, auth } from '../../config/firebase';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    topMenu: {
        background: '#fe4b11'
    },
    bottomMenu: {
        background: '#f5f5f5'
    }
}));

export default function NavBar() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [menus, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);

    const ref = firestore.collection('menu');
    const history = useHistory();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(null);
        history.push('/profile')
    };

    const handleLogin = (event) => {
        // setAnchorEl(event.currentTarget);
        setAnchorEl(null);
        history.push('/login');
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logOut = () => {
        auth.signOut();
        setAnchorEl(null);
        setCurrentUser(null);
        alert('Log out...')
    };

    //ONE TIME GET FUNCTION
    const getMenu = () => {
        setLoading(true);
        ref
            .get()
            .then((item) => {
                const items = item.docs.map((doc) => doc.data());
                setMenu(items);
                setLoading(false);
            });
    }
    useEffect(() => {
        getMenu();
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Toolbar className={classes.topMenu}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Panumas-Os
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleProfileMenuOpen}>Profile</MenuItem>
                        {currentUser ?
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                            :
                            <MenuItem onClick={handleLogin}>Login</MenuItem>
                        }

                    </Menu>
                </Toolbar>
                <Toolbar className={classes.bottomMenu}>
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button id='0'>Home</Button>
                        {menus.map((menu, idx) => <Button id={menu.id}>{menu.name}</Button>)}
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
}