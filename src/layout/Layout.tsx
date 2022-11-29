import { Layout } from 'antd'
// import Content from './Content'
import Footer from './Footer'
import Header from './header'
import Side from './Side'

const { Content } = Layout

export default () => {
    // return (
    //     <Layout hasSider>
    //         <Side />
    //         <Layout className='site-layout' style={{ marginLeft: 200 }}>
    //             <Header />
    //             <Content />
    //             <Footer />
    //         </Layout>
    //     </Layout>
    // )

    return (
        <Layout>
            <Header />
            {/* <Content
                style={{
                    marginTop: 0,
                    padding: 0,
                    height: '100vh',
                }}
            >
                <Layout className='site-layout-background' style={{ padding: 0, height: '94vh' }}>
                    <Side />
                    <Content style={{ padding: '0 24px', minHeight: 680 }}>Content</Content>
                </Layout>
            </Content> */}
        </Layout>
    )
}
