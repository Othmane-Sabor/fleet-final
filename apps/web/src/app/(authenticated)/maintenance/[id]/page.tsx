'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Button, Spin } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MaintenanceDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const [maintenance, setMaintenance] = useState<Model.Maintenance | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const maintenanceData = await Api.Maintenance.findOne(params.id, {
          includes: ['vehicle', 'technician'],
        })
        setMaintenance(maintenanceData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch maintenance details', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMaintenance()
    }
  }, [params.id])

  const handleEdit = () => {
    router.push(`/maintenance/edit/${params.id}`)
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Maintenance Details</Title>
      <Text type="secondary">
        Here you can view and manage the maintenance details.
      </Text>
      {loading ? (
        <Spin size="large" />
      ) : (
        maintenance && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Schedule Date">
              {dayjs(maintenance.scheduleDate).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {maintenance.status}
            </Descriptions.Item>
            <Descriptions.Item label="Type">
              {maintenance.type}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle">
              {maintenance.vehicle?.model}
            </Descriptions.Item>
            <Descriptions.Item label="Technician">
              {maintenance.technician?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Created">
              {dayjs(maintenance.dateCreated).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {dayjs(maintenance.dateUpdated).format('YYYY-MM-DD')}
            </Descriptions.Item>
          </Descriptions>
        )
      )}
      <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
        Edit Maintenance
      </Button>
    </PageLayout>
  )
}
