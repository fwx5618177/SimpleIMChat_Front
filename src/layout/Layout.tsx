import { Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Side from './Side'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1E1E1E',
        },
    },
})

export default () => {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Header />
                <Stack direction={'row'} spacing={0}>
                    <Side />
                    <Content />
                </Stack>
                {/* <Footer /> */}
            </ThemeProvider>
        </>
    )
}
