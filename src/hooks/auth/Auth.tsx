import React, { useEffect, useState } from 'react'
import SSO from '../../mock/SSO.json'

export const AuthName = () => {
    const [roleName, setRoleName] = useState<string>('')

    const requestSSO = async () => {
        const name = await SSO.role.name

        setRoleName(name)
    }

    useEffect(() => {
        requestSSO()
    }, [])

    return roleName
}

export const reducer = (state, action) => {
    switch (action) {
        case 'auth':
            return '1'

        default:
            return state
    }
}

export default React.createContext({} as any)
