'use client'

import { useEffect, useState } from 'react'
import { Button, Table, Modal, Form, Input, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function VehicleManagementPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [vehicles, setVehicles] = useState<Model.Vehicle[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const vehicleTypeNames = {
    'b4db6367-2c50-4ce0-9499-3e91cfd0ed52': 'Sedan',
    '64aa8e45-8d4f-4193-9f91-645af09b5301': 'Truck',
    '54d0e51f-68b5-40bd-bc0b-7e9b457327f2': 'Van',
    '69ff9d62-09df-4cc0-8c5b-ef91a3eaca0d': 'Electric',
  };
  const departmentNames = {
    '8b16017d-7300-43d3-9f35-c565b040bb22': 'Emergency Services',
    'a4eac9ed-9404-4229-96be-51fd447fdafd': 'Parks and Recreation',
    '1c0574de-a777-412b-ace7-103a527f0155': 'Public Works',
    '86a34367-83eb-4f0d-8eee-02a54af3ffa9': 'Sanitation',
  };

  useEffect(() => {
    fetchVehicles()
  }, [])

  
  const fetchVehicles = async () => {
    try {
      const vehiclesFound = await Api.Vehicle.findMany()
      setVehicles(vehiclesFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch vehicles', { variant: 'error' })
    }
  }

  const handleAddVehicle = async (values: Model.Vehicle) => {
    try {
      const processedValues = {
        ...values,
        year: values.year ? dayjs(values.year).year() : undefined,
      };
      const newVehicle = await Api.Vehicle.createOneByDepartmentId(
        values.departmentId,
        processedValues,
      )
      setVehicles([...vehicles, newVehicle])
      enqueueSnackbar('Vehicle added successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to add vehicle', { variant: 'error' })
    }
  }

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      await Api.Vehicle.deleteOne(vehicleId)
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId))
      enqueueSnackbar('Vehicle deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete vehicle', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleTypeId',
      key: 'vehicleTypeId',
      render: vehicleTypeId => vehicleTypeNames[vehicleTypeId] || 'Unknown Type',
    },
    {
      title: 'Department ',
      dataIndex: 'departmentId',
      key: 'departmentId',
      render: departmentId => departmentNames[departmentId] || 'Unknown Department',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Model.Vehicle) => (
        <Button danger onClick={() => handleDeleteVehicle(record.id)}>
          Delete
        </Button>
      ),
    },
    
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Vehicle Management</Title>
      <Text>
        Manage and overview all vehicles within the fleet, including adding,
        editing, and viewing detailed information.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Vehicle
      </Button>
      <Table dataSource={vehicles} columns={columns} rowKey="id" />
      <Modal
        title="Add New Vehicle"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddVehicle} layout="vertical">
          <Form.Item
            name="licensePlate"
            label="License Plate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vehicleTypeId"
            label="Vehicule Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a type">
              {/* Departments should be fetched and listed here */}
              <Option value="b4db6367-2c50-4ce0-9499-3e91cfd0ed52">Sedan</Option>
              <Option value="64aa8e45-8d4f-4193-9f91-645af09b5301">Truck</Option>
              <Option value="54d0e51f-68b5-40bd-bc0b-7e9b457327f2">Van</Option>
              <Option value="69ff9d62-09df-4cc0-8c5b-ef91a3eaca0d">Electric</Option>

            </Select>
          </Form.Item>
          <Form.Item name="model" label="Model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="departmentId"
            label="Department"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a department">
              {/* Departments should be fetched and listed here */}
              <Option value="8b16017d-7300-43d3-9f35-c565b040bb22">Emergency Services</Option>
              <Option value="a4eac9ed-9404-4229-96be-51fd447fdafd">Parks and Recreation</Option>
              <Option value="1c0574de-a777-412b-ace7-103a527f0155">Public Works</Option>
              <Option value="86a34367-83eb-4f0d-8eee-02a54af3ffa9">Sanitation</Option>


            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Vehicle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
