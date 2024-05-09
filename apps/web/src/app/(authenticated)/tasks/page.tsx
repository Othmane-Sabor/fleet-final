'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Table,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TaskManagementPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [tasks, setTasks] = useState<Model.Task[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchTasks()
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

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Task Management</Title>
      <Text>
        This page allows fleet managers to oversee and manage tasks related to
        fleet operations.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
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
            <Input />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select the due date!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
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
            <Select>{/* Placeholder for vehicle options */}</Select>
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
