import { Stack, Box, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, { FormEventHandler, useContext, useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import { TransitionProps } from '@mui/material/transitions'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import CloseIcon from '@mui/icons-material/Close'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import Slide from '@mui/material/Slide'
import moment from 'moment'
import random from 'random-number'
import content from '../mock/chatContent.json'
import Auth from '../hooks/auth/Auth'
import WSConnect from '../common/WSConnect'
import users from '../mock/users.json'
import { Socket } from 'socket.io-client'

interface ChatContainerProps {
    chatId: number
}

interface UsersInfo {
    name: string
    pic: string
    position: string
    status: boolean
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
    overflow: 'scroll',
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

const EditeText = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    height: 140,
    overflow: 'scroll',
    padding: theme.spacing(1, 1, 1, 2),
    outline: 'none',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 15,
    lineHeight: '160%',
    color: '#fff',
    letterSpacing: 1.5,
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

const SelfChatWordContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(0deg, rgba(4, 177, 125, 0.5), rgba(4, 177, 125, 0.5)), #FFFFFF',
    padding: theme.spacing(0, 1.5, 0, 2),
    color: 'black',
    minHeight: 60,
    height: 'atuo',
    wordBreak: 'break-word',
    overflowWrap: 'normal',
    letterSpacing: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
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

const ReplyMention = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#35343E',
    padding: theme.spacing(0, 1.5, 0, 2),
    color: '#7B798F',
    margin: theme.spacing(1, 0, 1, 0),
    maxWidth: '349px',
    height: '41px',
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

const ReplyMark = styled('div')(() => ({
    width: 2,
    height: 20,
    background: '#04B17D',
    borderRadius: 100,
}))

const ReplyFont = styled('div')(() => ({
    width: 317,
    height: 21,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 13,
    lineHeight: '160%',
    alignItems: 'center',
    color: '#7B798F',
    marginLeft: 10,
    marginRight: 10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))

const EditeReplyMention = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '60%',
    left: '2%',
    padding: theme.spacing(0, 1.5, 0, 2),
}))

const SpecialMentioned = styled('div')(({ theme }) => ({
    width: 300,
    height: 100,
    position: 'absolute',
    top: -120,
    left: 20,
    padding: theme.spacing(0, 1.5, 0, 2),
    background: '#35343E',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}))

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />
})

export default ({ chatId }: ChatContainerProps) => {
    // const [currentRoleName, setCurrentRoleName] = useState<string>('Jenny White')
    const { queryAuth: currentRoleName } = useContext(Auth)
    const [contentHistory, setContentHistory] = useState<any>(null)
    const [chatLists, setChatLists] = useState<any[]>([])
    const [chatHeader, setChatHeader] = useState<string>('')
    const [openDialog, setOpenDialog] = React.useState(false)
    const [replyMentionId, setReplyMentionId] = React.useState<number>(0)
    const [deleteSendId, setDeleteSendId] = React.useState<number>(0)
    const [formats, setFormats] = React.useState(() => ['bold', 'italic'])
    const [mentionedStatus, setMentionedStatus] = useState<boolean>(false)
    const [userInfos, setUserInfos] = useState<UsersInfo[]>([])
    const [mentionedSpecial, setMentionedSpecial] = useState<UsersInfo[]>([])

    const wsInfo: Socket<any, any> = WSConnect() as Socket

    const handleFormat = (_event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats)
    }

    const handleDelete = (sendId: number) => {
        setDeleteSendId(sendId)
        setOpenDialog(true)
    }

    const handleQuote = (mentionId: number) => {
        console.log('quote:', mentionId)
        setReplyMentionId(mentionId)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    const queryUserInfos = async () => {
        const data = await users

        console.log('users data:', data)

        if (data && Array.isArray(data) && data.length > 0) {
            const result: UsersInfo[] = data?.map(ci => ({
                name: ci?.name,
                position: ci?.position,
                pic: ci?.pic,
                status: ci?.status,
            }))

            setUserInfos(result)
        } else {
            setUserInfos([])
        }
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
            setChatLists([])
        }
    }

    // const ReplyFragment = (data: any, mentionId: number) => {
    //     const result = data?.find(vi => vi?.sendId === mentionId)?.content
    //     return (
    //         <ReplyMention>
    //             <ReplyMark />
    //             <ReplyFont>{result}</ReplyFont>
    //         </ReplyMention>
    //     )
    // }

    const handleDeleteClose = () => {
        const newLists = chatLists?.filter(ci => ci?.sendId !== deleteSendId)

        handleClose()
        setChatLists(newLists)
    }

    const handleInput = (_event: any) => {
        const target = (_event as React.KeyboardEvent)?.target as HTMLDivElement
        const type = (_event as React.KeyboardEvent)?.type
        const deleteContentBackward = ((_event as React.KeyboardEvent)?.nativeEvent as any)?.inputType

        if (type !== 'input') return
        const inputValue = target.innerText

        const extractMentioned = inputValue.match(/\@\S(.+)[\s]?/g)

        if (!extractMentioned) {
            if (deleteContentBackward === 'deleteContentBackward') {
                setMentionedSpecial([])
                setMentionedStatus(false)
            }

            return
        }
        // userInfos
        const name = extractMentioned[0]?.split(' ')[0]?.replace('@', '')

        const result = userInfos?.find(ci => ci?.name?.includes(name))

        console.log(
            'change:',
            // _event, type,
            target.innerText,
            name,
            result,
            deleteContentBackward,
        )

        if (!!result) {
            setMentionedSpecial([result])
            setMentionedStatus(true)
        } else {
            setMentionedSpecial([])
            setMentionedStatus(false)
        }
    }

    const handleSubmit = (_event: React.KeyboardEvent, replyMentionId: number) => {
        // console.log(_event?.keyCode, _event?.ctrlKey)
        // macos: control + Enter to submit infos
        const ctrlKey = _event?.ctrlKey
        if (_event.keyCode !== 13 || !ctrlKey) return
        // console.log(_event)
        const target: HTMLElement = _event.target as HTMLElement

        if (!target.innerHTML) return

        const sendTime = moment().format('HH:mm')
        const mentionId = replyMentionId || 0
        const content = target.innerHTML
        const name = currentRoleName
        const sendId = random({
            min: 12103,
            max: 9999999,
            integer: true,
        })

        const sendData = {
            sendId,
            name,
            sendTime,
            content,
            reply: {
                mentionId,
            },
        }

        target.innerHTML = ''

        console.log(sendData)

        wsInfo.emit(
            'hi',
            JSON.stringify({
                msg: sendData,
            }),
            res => {
                console.log('res!!!:', res)
            },
        )

        setChatLists([...chatLists, sendData])
        setReplyMentionId(0)

        // console.log(target.innerHTML, sendTime)
    }

    useEffect(() => {
        queryHistory()
        queryUserInfos()
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
                            {chatLists?.map((ci, index) => (
                                <>
                                    {ci?.name === currentRoleName ? (
                                        <Stack
                                            onMouseEnter={_e => {
                                                const plugins: HTMLElement = document.getElementById(`plugins_${ci?.reply?.mentionId}`) as HTMLElement
                                                plugins.style.visibility = 'visible'
                                            }}
                                            onMouseLeave={_e => {
                                                const plugins: HTMLElement = document.getElementById(`plugins_${ci?.reply?.mentionId}`) as HTMLElement

                                                plugins.style.visibility = 'hidden'
                                            }}
                                            key={index}
                                            direction={'row-reverse'}
                                            justifyContent={'flex-start'}
                                            alignItems={'center'}
                                        >
                                            <ListItem
                                                sx={{
                                                    width: '55%',
                                                }}
                                            >
                                                <ListItemText
                                                    style={{
                                                        marginRight: 15,
                                                    }}
                                                    primary={
                                                        <Stack direction={'row'} justifyContent={'flex-end'}>
                                                            <Typography variant='subtitle1' noWrap component={'div'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                                {ci?.name}
                                                            </Typography>

                                                            <Typography variant='subtitle1' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 5, color: '#bdb8b8' }}>
                                                                {ci?.sendTime}
                                                            </Typography>
                                                        </Stack>
                                                    }
                                                    secondary={
                                                        <>
                                                            <SelfChatWordContainer>
                                                                <Stack direction={'row'} justifyContent={'flex-start'}>
                                                                    <Typography variant='subtitle1' component={'div'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                                        {ci?.content}
                                                                    </Typography>
                                                                </Stack>
                                                            </SelfChatWordContainer>
                                                            {!ci?.reply?.mentionId ? null : (
                                                                <ReplyMention>
                                                                    <ReplyMark />
                                                                    <ReplyFont>{chatLists?.find(vi => vi?.sendId === ci?.reply?.mentionId)?.content}</ReplyFont>
                                                                </ReplyMention>
                                                            )}
                                                        </>
                                                    }
                                                />

                                                <ListItemAvatar>
                                                    <Avatar alt='Devon' src='xxx' />
                                                </ListItemAvatar>
                                            </ListItem>

                                            <ChatOpsPlugins
                                                style={{
                                                    visibility: 'hidden',
                                                }}
                                                id={`plugins_${ci?.reply?.mentionId}`}
                                            >
                                                <IconButton size='small' edge='start' color='inherit' aria-label='open drawer' onClick={_e => handleQuote(ci?.sendId)}>
                                                    <FormatQuoteIcon />
                                                </IconButton>
                                                <IconButton size='small' edge='start' color='inherit' aria-label='open drawer' onClick={() => handleDelete(ci?.sendId)}>
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </ChatOpsPlugins>
                                        </Stack>
                                    ) : (
                                        <Stack
                                            key={index}
                                            direction={'row'}
                                            justifyContent={'flex-start'}
                                            alignItems={'center'}
                                            onMouseEnter={_e => {
                                                const plugins: HTMLElement = document.getElementById(`plugins_${ci?.reply?.mentionId}`) as HTMLElement
                                                plugins.style.visibility = 'visible'
                                            }}
                                            onMouseLeave={_e => {
                                                const plugins: HTMLElement = document.getElementById(`plugins_${ci?.reply?.mentionId}`) as HTMLElement

                                                plugins.style.visibility = 'hidden'
                                            }}
                                        >
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
                                                                {ci?.name}
                                                            </Typography>

                                                            <Typography variant='subtitle1' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 5, color: '#bdb8b8' }}>
                                                                {ci?.sendTime}
                                                            </Typography>
                                                        </Stack>
                                                    }
                                                    secondary={
                                                        <>
                                                            <ChatWordContainer>
                                                                <Stack direction={'row'} justifyContent={'flex-start'}>
                                                                    <Typography variant='subtitle1' component={'div'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                                        {ci?.content}
                                                                    </Typography>
                                                                </Stack>
                                                            </ChatWordContainer>
                                                            {!ci?.reply?.mentionId ? null : (
                                                                <ReplyMention>
                                                                    <ReplyMark />
                                                                    <ReplyFont>{chatLists?.find(vi => vi?.sendId === ci?.reply?.mentionId)?.content}</ReplyFont>
                                                                </ReplyMention>
                                                            )}
                                                        </>
                                                    }
                                                />
                                            </ListItem>

                                            <ChatOpsPlugins
                                                style={{
                                                    visibility: 'hidden',
                                                }}
                                                id={`plugins_${ci?.reply?.mentionId}`}
                                            >
                                                <IconButton size='small' edge='start' color='inherit' aria-label='open drawer' onClick={_e => handleQuote(ci?.sendId)}>
                                                    <FormatQuoteIcon />
                                                </IconButton>
                                                <IconButton size='small' edge='start' color='inherit' aria-label='open drawer' onClick={_e => handleDelete(ci?.sendId)}>
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </ChatOpsPlugins>
                                        </Stack>
                                    )}
                                </>
                            ))}
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
                                <ToggleButton value='formatAlignLeftIcon' aria-label='formatAlignLeftIcon'>
                                    <FormatAlignLeftIcon />
                                </ToggleButton>
                                <ToggleButton value='FormatAlignCenterIcon' aria-label='FormatAlignCenterIcon'>
                                    <FormatAlignCenterIcon />
                                </ToggleButton>
                                <ToggleButton value='FormatAlignRightIcon' aria-label='FormatAlignRightIcon'>
                                    <FormatAlignRightIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>

                            <EditeText onInput={handleInput} contentEditable onKeyDown={e => handleSubmit(e, replyMentionId)} />
                            {!!replyMentionId ? (
                                <EditeReplyMention>
                                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                        <ReplyMention>
                                            <ReplyMark />
                                            <ReplyFont>{chatLists?.find(vi => vi?.sendId === replyMentionId)?.content}</ReplyFont>
                                        </ReplyMention>
                                        <IconButton
                                            style={{
                                                borderRadius: '50px',
                                                background: '#C9C7D0',
                                                opacity: 0.5,
                                                marginLeft: 10,
                                            }}
                                            size='small'
                                            edge='start'
                                            color='inherit'
                                            aria-label='open drawer'
                                            onClick={() => {
                                                setReplyMentionId(0)
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Stack>
                                </EditeReplyMention>
                            ) : null}

                            {mentionedStatus && (
                                <SpecialMentioned>
                                    <List>
                                        <Stack direction={'row'} justifyContent={'center'}>
                                            {mentionedSpecial?.map((ci, index) => (
                                                <ListItem key={'_mentionedSpecial' + index}>
                                                    <ListItemAvatar>
                                                        <Avatar alt={ci?.name} src={ci?.pic} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={ci?.name} secondary={ci?.position}></ListItemText>
                                                </ListItem>
                                            ))}
                                        </Stack>
                                    </List>
                                </SpecialMentioned>
                            )}
                        </Stack>
                    </EditeContainer>

                    <Dialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
                        <DialogTitle>{'Do you want to delete it?'}</DialogTitle>
                        <DialogActions>
                            <Button color='success' onClick={handleClose}>
                                Disagree
                            </Button>
                            <Button color='error' onClick={handleDeleteClose}>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            )}
        </>
    )
}
