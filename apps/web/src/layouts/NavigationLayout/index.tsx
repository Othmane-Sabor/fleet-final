import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = [
    {
      key: '/home',
      label: 'Dashboard',
      onClick: () => goTo('/home'),
    },

    {
      key: '/user-management',
      label: 'User Management',
      onClick: () => goTo('/user-management'),
    },

    {
      key: '/vehicles',
      label: 'Vehicle Management',
      onClick: () => goTo('/vehicles'),
    },

    {
      key: '/tasks',
      label: 'Task Management',
      onClick: () => goTo('/tasks'),
    },

    {
      key: '/maintenance',
      label: 'Maintenance Tasks',
      onClick: () => goTo('/maintenance'),
    },

    // {
    //   key: '/alerts',
    //   label: 'Alerts',
    //   onClick: () => goTo('/alerts'),
    // },

    {
      key: '/reports',
      label: 'Reports & Analytics',
      onClick: () => goTo('/reports'),
    },
  ]

  const itemsUser = []

  const itemsTopbar = []

  const itemsSubNavigation = [
    {
      key: '/home',
      label: 'Dashboard',
    },

    {
      key: '/user-management',
      label: 'User Management',
    },

    {
      key: '/vehicles',
      label: 'Vehicle Management',
    },

    {
      key: '/vehicles/:id',
      label: 'Vehicle Details',
    },

    {
      key: '/tasks',
      label: 'Task Management',
    },

    {
      key: '/tasks/:id',
      label: 'Task Details',
    },

    {
      key: '/maintenance',
      label: 'Maintenance Tasks',
    },

    {
      key: '/maintenance/:id',
      label: 'Maintenance Details',
    },

    {
      key: '/alerts',
      label: 'Alerts',
    },

    {
      key: '/reports',
      label: 'Reports & Analytics',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
