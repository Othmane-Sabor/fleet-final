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
import { PlusOutlined, EditOutlined, DeleteOutlined, CarOutlined, ToolOutlined, CalendarOutlined, InfoCircleOutlined, TagOutlined} from '@ant-design/icons';
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
  const [vehiculesMain, setVehiclesMain] = useState([])

  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false)
  const [form] = Form.useForm()
  console.log(vehicles)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await Api.Vehicle.findMany({
          includes: ['maintenances'],
        })

        const vehiclesWithMaintenances = vehiclesData.reduce((acc, vehicle) => {
          if (vehicle.maintenances.length > 0) {
            vehicle.maintenances.forEach(maintenance => {
              acc.push({
                ...maintenance,
                vehicleModel: vehicle.model, // Include the vehicle model in the maintenance record
              });
            });
          }
          return acc;
        }, []);
        
        setVehiclesMain(vehiclesWithMaintenances)
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
      dataIndex: 'model',
      key: 'model',
      style: { backgroundColor: '#f0f2f5' } // Light grey background for column headers
    },
    {
      title: 'Schedule Date',
      dataIndex: 'scheduleDate',
      key: 'scheduleDate',
      style: { backgroundColor: '#f0f2f5' }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      style: { backgroundColor: '#f0f2f5' }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      style: { backgroundColor: '#f0f2f5' }
    },
    {
      title: 'Actions',
      key: 'actions',
      style: { backgroundColor: '#f0f2f5' },
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditMaintenance(record)}
            style={{ color: '#1890ff' }} // Blue color for the edit icon
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMaintenance(record.id)}
            style={{ color: '#ff4d4f' }} // Red color for the delete icon
          />
        </Space>
      ),
    },
  ];

  const columns2 = [
    {
      title: 'Vehicle',
      dataIndex: 'vehicleModel',
      key: 'vehicleModel',
      style: { backgroundColor: '#f0f2f5' } // Light grey background for column headers
    },
    {
      title: 'Schedule Date',
      dataIndex: 'scheduleDate',
      key: 'scheduleDate',
      style: { backgroundColor: '#f0f2f5' }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      style: { backgroundColor: '#f0f2f5' }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      style: { backgroundColor: '#f0f2f5' }
    },
    {
      title: 'Actions',
      key: 'actions',
      style: { backgroundColor: '#f0f2f5' },
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditMaintenance(record)}
            style={{ color: '#1890ff' }} // Blue color for the edit icon
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMaintenance(record.id)}
            style={{ color: '#ff4d4f' }} // Red color for the delete icon
          />
        </Space>
      ),
    },
  ];
  
  return (
    <PageLayout layout="full-width">
      
      <Title>
      <span><ToolOutlined style={{ marginRight: 8 }} />Maintenance Management</span>
      </Title>
      
      <Text>
        Manage and track maintenance tasks for vehicles in your fleet.
      </Text>
      <Button
  type="primary"
  icon={<PlusOutlined />}
  onClick={handleAddMaintenance}
  style={{ backgroundColor: '#1DA57A', borderColor: '#1DA57A' }} // Green color
>
  Add Maintenance
</Button>
      <Table
        dataSource={vehiculesMain}
        columns={columns2}
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
            label={<span><CalendarOutlined /> Schedule Date</span>}
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item 
            name="status" 
            label={<span><InfoCircleOutlined /> Status</span>}
            rules={[{ required: true }]}
            >
            <Select>
              <Option value="scheduled">Scheduled</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          <Form.Item name="type" label={<span><TagOutlined /> Type</span>} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
  name="vehicleId"
  label={<span><CarOutlined /> Vehicle</span>}
  rules={[{ required: true, message: 'Please select the vehicle!' }]}
>
  <Select
    placeholder="Select a vehicle"
    onChange={(value) => setSelectedVehicle(value)} // Update selected vehicle on change
  >
    {vehicles.map(vehicle => (
      <Option key={vehicle.id} value={vehicle.id}>
        {vehicle.model}
      </Option>
    ))}
  </Select>
</Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}

