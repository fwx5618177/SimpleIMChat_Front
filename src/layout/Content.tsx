import React from 'react'
import { Breadcrumb, Layout } from 'antd'

const { Content } = Layout

export default (props: any) => {
    console.log(props)

    return (
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            {props.children}
        </Content>
    )
}
