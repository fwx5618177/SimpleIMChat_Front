import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import { Stack, Divider } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import LanguageIcon from '@mui/icons-material/Language'
import ListItemButton from '@mui/material/ListItemButton'

const BoxContainer = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginTop: 50,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SelectedButton = styled(ListItemButton)(({ theme }) => ({
    color: 'inherit',
}))

export default () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1)

    const handleListItemClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index)
    }

    return (
        <Stack
            direction={'column'}
            spacing={{
                xs: 1,
                sm: 2,
                md: 4,
            }}
            justifyContent={'space-between'}
            style={{
                maxHeight: '90vh',
            }}
        >
            <Stack direction={'column'} justifyContent={'flex-end'}>
                <BoxContainer>
                    <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Engage
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <SelectedButton selected={selectedIndex === 0} onClick={event => handleListItemClick(event, 0)}>
                                <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
                                    <ListItemAvatar>
                                        <Badge badgeContent={0} color='error'>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText primary='Forum' />
                                </IconButton>
                            </SelectedButton>
                        </ListItem>

                        <ListItem>
                            <SelectedButton selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
                                <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
                                    <ListItemAvatar>
                                        <Badge badgeContent={25} color='error'>
                                            <Avatar>
                                                <WorkIcon />
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText primary='Chat' />
                                </IconButton>
                            </SelectedButton>
                        </ListItem>

                        <ListItem>
                            <SelectedButton selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2)}>
                                <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
                                    <ListItemAvatar>
                                        <Badge badgeContent={0} color='error'>
                                            <Avatar>
                                                <BeachAccessIcon />
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText primary='Matches' />
                                </IconButton>
                            </SelectedButton>
                        </ListItem>
                    </List>
                </BoxContainer>

                <Divider />

                <BoxContainer>
                    <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                        People
                    </Typography>

                    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <SelectedButton selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3)}>
                                <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
                                    <ListItemAvatar>
                                        <Badge badgeContent={0} color='error'>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText primary='Members' />
                                </IconButton>
                            </SelectedButton>
                        </ListItem>

                        <ListItem>
                            <SelectedButton selected={selectedIndex === 4} onClick={event => handleListItemClick(event, 4)}>
                                <ListItemAvatar>
                                    <Badge badgeContent={0} color='error'>
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText primary='Contributors' />
                            </SelectedButton>
                        </ListItem>
                    </List>
                </BoxContainer>
            </Stack>

            <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
                <LanguageIcon />
                <Typography variant='subtitle1' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Powered by Gradual
                </Typography>
            </IconButton>
        </Stack>
    )
}
