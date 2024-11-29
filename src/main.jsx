import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import './style.scss'
import ContextProvider from './context/ContextProvider'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Home from './pages/Home'
import UserAdministration from './pages/UserAdministration'
import UserReactivation from './pages/UserReactivation'
import ChangeLogs from './pages/ChangeLogs'

const router = createBrowserRouter([{
  path: '/',
  errorElement: <ErrorPage />,
  element: <Root />,
  children: [{
    path: '/login',
    element: <Login/>
  },{
    path: '/home',
    element: <Home />
  },{
    path: '/userAdministration',
    element: <UserAdministration />
  }, {
    path: '/userReactivation',
    element: <UserReactivation />
  }, {
    path: '/changeLogs',
    element: <ChangeLogs />
  } ]
}])

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </ContextProvider>
)
