import React from 'react'
import { AppstoreOutlined, BarChartOutlined, CloudOutlined, ShopOutlined, TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'

const { Sider } = Layout

const items: MenuProps['items'] = [UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined, CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}))

export default () => (
    // <Sider
    //     style={{
    //         overflow: 'auto',
    //         height: '100vh',
    //         position: 'fixed',
    //         left: 0,
    //         top: 0,
    //         bottom: 0,
    //     }}
    // >
    //     <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']} items={items} />
    // </Sider>
    <Sider
        style={{
            left: 0,
            top: 0,
        }}
        className='site-layout-background'
        width={300}
    >
        <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }} items={items} />
    </Sider>
)
