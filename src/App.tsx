import React, { useReducer } from 'react'
import Auth, { reducer } from './hooks/auth/Auth'
import Layout from './layout/Layout'

function App() {
    const [queryAuth, dispatch] = useReducer(reducer, 'Jenny White')

    return (
        <>
            <Auth.Provider value={{ queryAuth, dispatch }}>
                <Layout />
            </Auth.Provider>
        </>
    )
}

export default App
