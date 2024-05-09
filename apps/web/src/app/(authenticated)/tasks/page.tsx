'use client'

import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Typography,
} from 'antd'
import { PlusOutlined , BookOutlined, WarningOutlined, EditOutlined, CalendarOutlined, CheckCircleOutlined, CarOutlined} from '@ant-design/icons'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography
const { Option } = Select

export default function TaskManagementPage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Model.Vehicle[]>([])
  const [hover, setHover] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [tasks, setTasks] = useState<Model.Task[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const fetchVehicles = async () => {
    try {
      const vehiclesFound = await Api.Vehicle.findMany()
      setVehicles(vehiclesFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch vehicles', { variant: 'error' })
    }
  }

  useEffect(() => {
    if (userId) {
      fetchTasks()
      fetchVehicles()

    }
  }, [userId])

  

  const fetchTasks = async () => {
    try {
      const tasksFound = await Api.Task.findManyByAssignedUserId(userId, {
        includes: ['assignedUser', 'vehicle'],
      })
      setTasks(tasksFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch tasks', { variant: 'error' })
    }
  }

  const handleCreateTask = async values => {
    try {
      await Api.Task.createOneByAssignedUserId(userId, {
        description: values.description,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        status: values.status,
        vehicleId: values.vehicleId,
      })
      enqueueSnackbar('Task created successfully', { variant: 'success' })
      fetchTasks()
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to create task', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: text => (
        <>
          <WarningOutlined style={{ color: 'red', marginRight: 8 }} />
          {text}
        </>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: text => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Assigned User',
      dataIndex: 'assignedUser',
      key: 'assignedUser',
      render: (_, record) => record.assignedUser?.name || 'Not Assigned',
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
      render: (_, record) => record.vehicle?.model || 'No Vehicle',
    },
  ]
  

  console.log("vehicules", vehicles );

  const hoverStyle = hover ? { backgroundColor: '#4CAF50', color: 'white' } : {};

  return (
    <PageLayout layout="full-width">
      <Title level={2}><BookOutlined style={{ marginRight: 8 }}/>Task Management</Title>
      <Text>
        This page allows fleet managers to oversee and manage tasks related to
        fleet operations.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{
        marginBottom: 16,
        backgroundColor: hover ? '#4CAF50' : '#1890ff',  // Normal state color
        borderColor: hover ? '#3e8e41' : '#1890ff',  // Normal state border color
        ...hoverStyle  // This applies additional styles when hovered
        }}
      >
        Add Task
      </Button>
      <Table dataSource={tasks} columns={columns} rowKey="id" />
      <Modal
        title="Create New Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateTask} layout="vertical">
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input prefix={<EditOutlined />} />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select the due date!' }]}
          >
            <DatePicker suffixIcon={<CalendarOutlined />} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select suffixIcon={<CheckCircleOutlined />}>
              <Option value="Pending">Pending</Option>
              <Option value="InProgress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="vehicleId"
            label="Vehicle"
            rules={[{ required: true, message: 'Please select the vehicle!' }]}
          >
          <Select suffixIcon={<CarOutlined />}>
              {vehicles.map(vehicle => (
                <Option key={vehicle.id} value={vehicle.id}>
                  {vehicle.model}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
