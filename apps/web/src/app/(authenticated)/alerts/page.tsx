'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Modal,
  Input,
  Select,
  Space,
} from 'antd'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
const { confirm } = Modal
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AlertsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [alerts, setAlerts] = useState<Model.Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchAlerts()
    }
  }, [userId])

  const fetchAlerts = async () => {
    try {
      const userAlerts = await Api.Alert.findManyByVehicleId(userId, {
        includes: ['vehicle'],
      })
      setAlerts(userAlerts)
      setLoading(false)
    } catch (error) {
      enqueueSnackbar('Failed to fetch alerts', { variant: 'error' })
      setLoading(false)
    }
  }

  const handleDeleteAlert = (alertId: string) => {
    confirm({
      title: 'Are you sure delete this alert?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk: async () => {
        try {
          await Api.Alert.deleteOne(alertId)
          fetchAlerts()
          enqueueSnackbar('Alert deleted successfully', { variant: 'success' })
        } catch (error) {
          enqueueSnackbar('Failed to delete alert', { variant: 'error' })
        }
      },
    })
  }

  const handleCreateAlert = async (values: Partial<Model.Alert>) => {
    try {
      await Api.Alert.createOneByVehicleId(userId, values)
      fetchAlerts()
      enqueueSnackbar('Alert created successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to create alert', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Vehicle Alerts Management</Title>
      <Text type="secondary">
        Manage and view all vehicle alerts and notifications.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() =>
          handleCreateAlert({ message: 'New alert', criticality: 'High' })
        }
        style={{ marginBottom: 16 }}
      >
        Add Alert
      </Button>
      <Row gutter={16}>
        {alerts?.map(alert => (
          <Col key={alert.id} span={8}>
            <Card
              title={`Alert for ${alert.vehicle?.model}`}
              extra={
                <Button type="link" onClick={() => handleDeleteAlert(alert.id)}>
                  Delete
                </Button>
              }
            >
              <p>
                <Text strong>Message:</Text> {alert.message}
              </p>
              <p>
                <Text strong>Criticality:</Text> {alert.criticality}
              </p>
              <p>
                <Text strong>Date:</Text>{' '}
                {dayjs(alert.dateCreated).format('YYYY-MM-DD')}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
