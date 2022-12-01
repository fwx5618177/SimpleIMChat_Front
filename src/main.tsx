import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import './index.css'
import 'antd/dist/reset.css'
// import 'tailwindcss/tailwind.css'
// import 'lib-flexible'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
)
