import { Divider, Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Content from './Content'
// import Content from './Content'
import Footer from './Footer'
import Header from './header'
import Side from './Side'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
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
