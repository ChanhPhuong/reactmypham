import { Layout } from "antd";

const { Header, Sider, Footer, Content } = Layout;

const ViewHome = () => {
    return (
        <>
            <Layout>
                <Header >header

                </Header>
                <Layout>
                    <Sider style={{ background: "red", height: "100px" }}>left sidebar</Sider>
                    <Content>main content</Content>
                    <Sider style={{ background: "red", height: "100px" }}>right sidebar</Sider>
                </Layout>
                <Footer className="text-center">footer</Footer>
            </Layout>
        </>
    )
}

export default ViewHome;