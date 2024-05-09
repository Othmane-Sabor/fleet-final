'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Statistic, Card } from 'antd'
import {
  CarOutlined,
  ToolOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  LineChartOutlined
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ReportsAnalyticsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [vehicles, setVehicles] = useState<Model.Vehicle[]>([])
  const [tasks, setTasks] = useState<Model.Task[]>([])
  const [maintenances, setMaintenances] = useState<Model.Maintenance[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesData = await Api.Vehicle.findMany({
          includes: ['tasks', 'maintenances'],
        })
        setVehicles(vehiclesData)

        const tasksData = await Api.Task.findMany({ includes: ['vehicle'] })
        setTasks(tasksData)

        const maintenancesData = await Api.Maintenance.findMany({
          includes: ['vehicle'],
        })
        setMaintenances(maintenancesData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }

    fetchData()
  }, [])

  const totalFuelExpenses = vehicles.reduce(
    (acc, vehicle) =>
      acc +
      (vehicle.maintenances?.reduce(
        (sum, m) => sum + (m.type === 'Fuel' ? 1 : 0),
        0,
      ) || 0),
    0,
  )
  const totalCompletedTasks = tasks.filter(
    task => task.status === 'Completed',
  ).length
  const totalMaintenance = maintenances.length

  return (
    <PageLayout layout="full-width">
      <Title level={2}>
  <span><LineChartOutlined style={{ marginRight: 8 }} />Fleet Operations Analytics</span>
</Title>
      <Text>
        Comprehensive analytics and reports on fleet operations, including task
        completion rates, fuel expenses, and maintenance history.
      </Text>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Completed Tasks"
              value={totalCompletedTasks}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Fuel Expenses"
              value={totalFuelExpenses}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Maintenance"
              value={totalMaintenance}
              prefix={<ToolOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Vehicles"
              value={vehicles.length}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
