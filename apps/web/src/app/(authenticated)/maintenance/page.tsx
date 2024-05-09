'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MaintenanceManagementPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [vehicles, setVehicles] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await Api.Vehicle.findMany({
          includes: ['maintenances'],
        })
        setVehicles(vehiclesData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch vehicles', { variant: 'error' })
      }
    }

    fetchVehicles()
  }, [])

  const handleAddMaintenance = () => {
    form.resetFields()
    setMaintenanceModalVisible(true)
  }

  const handleEditMaintenance = maintenance => {
    form.setFieldsValue({
      ...maintenance,
      scheduleDate: dayjs(maintenance.scheduleDate),
    })
    setSelectedVehicle(maintenance.vehicleId)
    setMaintenanceModalVisible(true)
  }

  const handleDeleteMaintenance = async maintenanceId => {
    try {
      await Api.Maintenance.deleteOne(maintenanceId)
      enqueueSnackbar('Maintenance deleted successfully', {
        variant: 'success',
      })
      setVehicles(prev =>
        prev.filter(v => v.maintenances.filter(m => m.id !== maintenanceId)),
      )
    } catch (error) {
      enqueueSnackbar('Failed to delete maintenance', { variant: 'error' })
    }
  }

  const handleFinish = async values => {
    const maintenanceData = {
      ...values,
      scheduleDate: values.scheduleDate.format('YYYY-MM-DD'),
      vehicleId: selectedVehicle,
      technicianId: userId,
    }

    try {
      if (maintenanceData.id) {
        await Api.Maintenance.updateOne(maintenanceData.id, maintenanceData)
        enqueueSnackbar('Maintenance updated successfully', {
          variant: 'success',
        })
      } else {
        await Api.Maintenance.createOneByVehicleId(
          selectedVehicle,
          maintenanceData,
        )
        enqueueSnackbar('Maintenance added successfully', {
          variant: 'success',
        })
      }
    } catch (error) {
      enqueueSnackbar('Failed to save maintenance', { variant: 'error' })
    }

    setMaintenanceModalVisible(false)
  }

  const columns = [
    {
      title: 'Vehicle',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: 'Schedule Date',
      dataIndex: 'scheduleDate',
      key: 'scheduleDate',
      render: text => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditMaintenance(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMaintenance(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title>Maintenance Management</Title>
      <Text>
        Manage and track maintenance tasks for vehicles in your fleet.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddMaintenance}
      >
        Add Maintenance
      </Button>
      <Table
        dataSource={vehicles.flatMap(v => v.maintenances)}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title="Add/Edit Maintenance"
        visible={maintenanceModalVisible}
        onCancel={() => setMaintenanceModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="scheduleDate"
            label="Schedule Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="scheduled">Scheduled</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}
