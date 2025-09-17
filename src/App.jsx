import { Flex, Layout } from 'antd'
import AppHeader from './components/layout/Header/AppHeader'
import AppSider from './components/layout/Sider/AppSider'
import AppContent from './components/layout/AppContent/AppContent'

export default function App() {
  return(
    <Layout>
      <AppHeader/>
      <Layout>
        <AppSider/>
        <AppContent/>
      </Layout>
    </Layout>
  )
}
