import { Stack, Box, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'

import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import content from '../mock/chatContent.json'

interface ChatContainerProps {
    chatId: number
}

const ChatHeader = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(1.2, 2, 1, 2),
    borderRadius: theme.shape.borderRadius,
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: '100%',
    height: '60px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: '100%',
    },
}))

const ChatContentBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginTop: 5,
    paddingLeft: 10,
    width: '100%',
    height: '70vh',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: '100%',
    },
}))

const EditeContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginTop: 5,
    paddingLeft: 10,
    width: '100%',
    padding: theme.spacing(0, 0, 0, 0),
    [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: '100%',
    },
}))

const Group = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 25,
    borderColor: '#c7c1c1',
    borderWidth: 1,
    backdropFilter: 'blur(2px) brightness(60%)',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 100,
    height: 40,
}))

const GroupIconWrap = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const ChatWordContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    padding: theme.spacing(0, 1.5, 0, 2),
    color: 'white',
    minHeight: 60,
    height: 'atuo',
    wordBreak: 'break-word',
    overflowWrap: 'normal',
    letterSpacing: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}))

const ChatOpsPlugins = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: '#6b6767',
    borderWidth: 1,
    backdropFilter: 'blur(2px) brightness(60%)',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    margin: theme.spacing(3, 1.5, 0, 0),
    width: 100,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}))

export default ({ chatId }: ChatContainerProps) => {
    const [contentHistory, setContentHistory] = useState<any>(null)
    const [chatLists, setChatLists] = useState<any[]>([])
    const [chatHeader, setChatHeader] = useState<string>('')
    const [formats, setFormats] = React.useState(() => ['bold', 'italic'])

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats)
    }

    const queryHistory = async () => {
        const result = content?.filter(ci => ci?.chatId === chatId)

        console.log(result)

        if (result && Array.isArray(result) && result.length > 0) {
            const data = result[0]

            setContentHistory(data)
            setChatHeader(data?.chatName)
            setChatLists(data?.content)
        } else {
            setContentHistory([])
            setChatHeader('')
        }
    }

    useEffect(() => {
        queryHistory()
    }, [chatId])

    return (
        <>
            {chatId === -1 ? null : (
                <Stack direction={'column'}>
                    <ChatHeader>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={0}>
                            <Typography variant='h5' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {chatHeader}
                            </Typography>
                            {chatHeader ? (
                                <Group>
                                    <GroupIconWrap>
                                        <GroupIcon />
                                        <Typography
                                            variant='h6'
                                            noWrap
                                            component='div'
                                            sx={{
                                                display: { xs: 'none', sm: 'block' },
                                                marginLeft: 2,
                                            }}
                                        >
                                            {contentHistory?.joiner?.members}
                                        </Typography>
                                    </GroupIconWrap>
                                </Group>
                            ) : null}
                        </Stack>
                    </ChatHeader>
                    <Divider
                        style={{
                            margin: 0,
                        }}
                        variant='middle'
                        flexItem
                    />
                    <ChatContentBox>
                        <List>
                            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                                <ListItem
                                    sx={{
                                        width: '55%',
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt='Devon' src='xxx' />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Stack direction={'row'} justifyContent={'flex-start'}>
                                                <Typography variant='subtitle1' noWrap component={'div'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                    Devon Lane
                                                </Typography>

                                                <Typography variant='subtitle1' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 5, color: '#bdb8b8' }}>
                                                    20:34
                                                </Typography>
                                            </Stack>
                                        }
                                        secondary={
                                            <ChatWordContainer>
                                                <Stack direction={'row'} justifyContent={'flex-start'}>
                                                    <Typography variant='subtitle1' component={'div'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                        Checkout
                                                    </Typography>
                                                </Stack>
                                            </ChatWordContainer>
                                        }
                                    />
                                </ListItem>

                                <ChatOpsPlugins>
                                    <IconButton size='small' edge='start' color='inherit' aria-label='open drawer'>
                                        <FormatQuoteIcon />
                                    </IconButton>
                                    <IconButton size='small' edge='start' color='inherit' aria-label='open drawer'>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </ChatOpsPlugins>
                            </Stack>
                        </List>
                    </ChatContentBox>

                    <Divider
                        style={{
                            margin: 0,
                        }}
                        variant='middle'
                        flexItem
                    />

                    <EditeContainer>
                        <Stack direction={'column'}>
                            <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label='text formatting'>
                                <ToggleButton value='bold' aria-label='bold'>
                                    <FormatBoldIcon />
                                </ToggleButton>
                                <ToggleButton value='italic' aria-label='italic'>
                                    <FormatItalicIcon />
                                </ToggleButton>
                                <ToggleButton value='underlined' aria-label='underlined'>
                                    <FormatUnderlinedIcon />
                                </ToggleButton>
                                <ToggleButton value='color' aria-label='color' disabled>
                                    <FormatColorFillIcon />
                                    <ArrowDropDownIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>

                            <div>1</div>
                        </Stack>
                    </EditeContainer>
                </Stack>
            )}
        </>
    )
}
