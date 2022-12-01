import React, { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { styled, alpha } from '@mui/material/styles'
import { Autocomplete, Divider, Stack, TextField } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import ListItemButton from '@mui/material/ListItemButton'
import SearchIcon from '@mui/icons-material/Search'
import { mockData } from '../mock/chatList'
import ChatContainerContent from '../pages/ChatContainerContent'

const BoxContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    width: '100%',
    padding: theme.spacing(0, 0, 0, 0),
}))

const ChatListContainer = styled(Box)(({ theme }) => ({
    height: '90vh',
    width: '25%',
    backgroundColor: '#1D1C21',
}))

const ChatContainer = styled(Box)(({ theme }) => ({
    height: '90vh',
    width: '100%',
    backgroundColor: '#26252D',
    // padding: theme.spacing(1, 1, 1, 0),
}))

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: '100%',
    },
}))

type SearchListProps = {
    label: string
    value: string | number
}

interface ChatListI {
    id: number
    chatId: number
    pic: string
    description: string
    primary: string
    secondary: string
    time: string
    unread: number
}

export default (_props: any) => {
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const [chatList, setChatList] = React.useState<ChatListI[]>([])
    const [performanceList, setPerformanceList] = React.useState<ChatListI[]>([])
    const [searchList, setSearchList] = React.useState<SearchListProps[]>([])

    const handleListItemClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        // console.log('index:', index, selectedIndex, selectedIndex === index)

        setSelectedIndex(index)
    }

    const changeFilterChatList = (_event: any, newValue: any) => {
        const filterChatList = chatList?.filter(ci => ci?.primary === newValue || ci?.primary?.includes(newValue))

        setPerformanceList(filterChatList as any)
    }

    useEffect(() => {
        ;(() => {
            const options = mockData?.map(ci => {
                return {
                    label: ci?.primary,
                    value: ci?.primary,
                }
            })

            setSearchList(options)
            setChatList(mockData)
            setPerformanceList(mockData)
        })()
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <BoxContainer>
                <Stack direction={'row'} spacing={0}>
                    <ChatListContainer>
                        <Stack direction={'column'} justifyContent={'flex-start'}>
                            <Search>
                                <Autocomplete
                                    autoComplete
                                    autoSelect
                                    options={searchList as SearchListProps[]}
                                    disablePortal
                                    onInputChange={changeFilterChatList}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={
                                                <Search>
                                                    <SearchIcon />
                                                    Search
                                                </Search>
                                            }
                                        />
                                    )}
                                />
                            </Search>
                            <Divider variant='middle' />

                            <List
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {performanceList?.map((ci, index) => (
                                    <ListItem
                                        key={index}
                                        style={{
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                        }}
                                    >
                                        <ListItemButton selected={selectedIndex === ci?.chatId} onClick={event => handleListItemClick(event, ci?.chatId)}>
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

                    <ChatContainer>
                        <ChatContainerContent chatId={selectedIndex as number} />
                    </ChatContainer>
                </Stack>
            </BoxContainer>
        </React.Fragment>
    )
}
