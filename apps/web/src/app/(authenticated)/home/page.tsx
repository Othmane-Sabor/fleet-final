'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, List, Avatar } from 'antd'
import {
  CarOutlined,
  ToolOutlined,
  AlertOutlined,
  UserOutlined,
  DashboardOutlined
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [vehicles, setVehicles] = useState<Model.Vehicle[]>([])
  const [tasks, setTasks] = useState<Model.Task[]>([])
  const [maintenances, setMaintenances] = useState<Model.Maintenance[]>([])
  const [alerts, setAlerts] = useState<Model.Alert[]>([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      router.push('/home')
      return
    }

    const fetchData = async () => {
      try {
        const vehiclesData = await Api.Vehicle.findMany({
          includes: ['vehicleType', 'alerts'],
        })
        setVehicles(vehiclesData)

        const tasksData = await Api.Task.findMany({
          includes: ['vehicle', 'assignedUser'],
        })
        setTasks(tasksData)

        const maintenancesData = await Api.Maintenance.findMany({
          includes: ['vehicle', 'technician'],
        })
        setMaintenances(maintenancesData)

        const alertsData = await Api.Alert.findMany({ includes: ['vehicle'] })
        setAlerts(alertsData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }

    fetchData()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>
  <span><DashboardOutlined style={{ marginRight: 8 }} />Fleet Master Dashboard</span>
</Title>
      <Text>Welcome to your fleet management overview.</Text>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Vehicles" extra={<CarOutlined />} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={vehicles}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<CarOutlined style={{ backgroundColor: '#52c41a', color: 'white' }} />} />}
                    title={item.model}
                    description={`Year: ${item.year} - Type: ${item.vehicleType?.typeName}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Tasks" extra={<ToolOutlined />} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={tasks}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ToolOutlined style={{ backgroundColor: '#fadb14', color: 'white' }} />} />}
                    title={item.description}
                    description={`Due: ${dayjs(item.dueDate).format('YYYY-MM-DD')} - Status: ${item.status}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Maintenances" extra={<ToolOutlined />} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={maintenances}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ToolOutlined />} />}
                    title={`Scheduled: ${dayjs(item.scheduleDate).format('YYYY-MM-DD')}`}
                    description={`Type: ${item.type} - Status: ${item.status}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Alerts" extra={<AlertOutlined />} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={alerts}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                     avatar={<Avatar icon={<AlertOutlined style={{ backgroundColor: '#ff4d4f', color: 'white' }} />} />}
                    title={item.message}
                    description={`Criticality: ${item.criticality}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
