'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Button, Spin, Alert } from 'antd'
import { CarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function VehicleDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [vehicle, setVehicle] = useState<Model.Vehicle | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('Vehicle ID is missing', { variant: 'error' })
      router.push('/vehicles')
      return
    }

    const fetchVehicle = async () => {
      setLoading(true)
      try {
        const vehicleData = await Api.Vehicle.findOne(params.id, {
          includes: [
            'vehicleType',
            'department',
            'tasks',
            'maintenances',
            'alerts',
          ],
        })
        setVehicle(vehicleData)
      } catch (err) {
        setError('Failed to fetch vehicle data')
        enqueueSnackbar('Failed to fetch vehicle data', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [params.id, router])

  const handleBack = () => {
    router.push('/vehicles')
  }

  if (loading) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout layout="full-width">
        <Alert message={error} type="error" />
        <Button onClick={handleBack}>Back to Vehicles</Button>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>
        <CarOutlined /> Vehicle Details
      </Title>
      {vehicle ? (
        <Descriptions bordered>
          <Descriptions.Item label="License Plate">
            {vehicle.licensePlate}
          </Descriptions.Item>
          <Descriptions.Item label="Model">{vehicle.model}</Descriptions.Item>
          <Descriptions.Item label="Year">{vehicle.year}</Descriptions.Item>
          <Descriptions.Item label="Vehicle Type">
            {vehicle.vehicleTypeId}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {vehicle.department?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Created">
            {dayjs(vehicle.dateCreated).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {dayjs(vehicle.dateUpdated).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text>No vehicle data available.</Text>
      )}
      <Button type="primary" onClick={handleBack} style={{ marginTop: 16 }}>
        Back to Vehicle List
      </Button>
    </PageLayout>
  )
}
