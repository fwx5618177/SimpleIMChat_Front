enum BuildEnv {
    dev = 'dev',
    prod = 'prod',
}

export const BUILD_ENV = process.env.NODE_ENV as BuildEnv

export const webSocketURL = {
    [BuildEnv.dev]: 'ws://localhost:7070',
    [BuildEnv.prod]: 'wss://localhost:7071',
}[BUILD_ENV]
