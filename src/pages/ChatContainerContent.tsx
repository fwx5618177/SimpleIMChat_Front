import { Stack, Box, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
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

export default ({ chatId }: ChatContainerProps) => {
    const [contentHistory, setContentHistory] = useState<any>(null)
    const [chatLists, setChatLists] = useState<any[]>([])
    const [chatHeader, setChatHeader] = useState<string>('')

    const queryHistory = async () => {
        const result = content?.filter(ci => ci?.chatId === chatId)

        console.log(result)

        if (result && Array.isArray(result) && result.length > 0) {
            const data = result[0]

            setContentHistory(data)
            setChatHeader(data?.chatName)
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
                        </Stack>
                    </ChatHeader>
                    <Divider
                        style={{
                            margin: 0,
                        }}
                        variant='middle'
                        flexItem
                    />
                    <ChatContentBox>{chatId}</ChatContentBox>

                    <Divider
                        style={{
                            margin: 0,
                        }}
                        variant='middle'
                        flexItem
                    />

                    <EditeContainer>{chatId}</EditeContainer>
                </Stack>
            )}
        </>
    )
}
