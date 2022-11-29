import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import AccountCircle from '@mui/icons-material/AccountCircle'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LanguageIcon from '@mui/icons-material/Language'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingTop: `calc(14px)`,
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

export default () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    // const [localTime, setLocalTime] = React.useState<string | null>(null)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    // const queryLocalTime = () => {
    //     const time = new Date()
    //     const timeZone
    // }

    const menuId = 'primary-search-account-menu'
    const isMenuOpen = Boolean(anchorEl)

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    )

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Gradual Community
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                },
                            }}
                        >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
                            </Search>

                            <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
                                <LanguageIcon />
                            </IconButton>
                            <Typography
                                style={{
                                    marginLeft: -20,
                                    padding: '10px 0 0 0',
                                }}
                                variant='subtitle1'
                                noWrap
                                component='div'
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                {new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' })}
                                {'  '}
                                {Intl.DateTimeFormat().resolvedOptions().timeZone}
                            </Typography>

                            <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
                                <Badge badgeContent={0} color='error'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
                                <Badge badgeContent={0} color='error'>
                                    <HelpOutlineIcon />
                                </Badge>
                            </IconButton>

                            <IconButton size='large' edge='end' aria-label='account of current user' aria-controls={menuId} aria-haspopup='true' onClick={handleProfileMenuOpen} color='inherit'>
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </Box>
        </ThemeProvider>
    )
}
