import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Stack } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import ListItemButton from '@mui/material/ListItemButton'
import { mockData } from 'src/mock/chatList'

const BoxContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    width: '100%',
    padding: theme.spacing(0, 0, 0, 0),
}))

const ChatListContainer = styled(Box)(({ theme }) => ({
    height: '90vh',
    width: '25%',
    backgroundColor: '#212121',
}))

const ChatContainer = styled(Box)(({ theme }) => ({
    height: '90vh',
    width: '100%',
    backgroundColor: '#424242',
    padding: theme.spacing(1, 1, 1, 0),
}))

export default (_props: any) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <BoxContainer>
                <Stack direction={'row'} spacing={0}>
                    <ChatListContainer>
                        <Stack direction={'column'} justifyContent={'flex-start'}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {mockData?.map((ci, index) => (
                                    <ListItem key={index}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Badge badgeContent={ci?.unread} color='error'>
                                                    <Avatar alt={ci?.description} src={ci?.pic} />
                                                </Badge>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                                        <Typography variant='subtitle1' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                            {ci?.primary}
                                                        </Typography>

                                                        <Typography variant='subtitle1' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                            {ci?.time}
                                                        </Typography>
                                                    </Stack>
                                                }
                                                secondary={ci?.secondary}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Stack>
                    </ChatListContainer>

                    <ChatContainer />
                </Stack>
            </BoxContainer>
        </React.Fragment>
    )
}
