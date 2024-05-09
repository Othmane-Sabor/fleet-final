'use client'

import { Button, Table, Modal, Form, Input, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UserManagementPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [users, setUsers] = useState<Model.User[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const usersFound = await Api.User.findMany()
      setUsers(usersFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch users', { variant: 'error' })
    }
  }

  const handleAddUser = () => {
    form.resetFields()
    setCurrentUserId(null)
    setIsModalVisible(true)
  }

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      form.setFieldsValue(user)
      setCurrentUserId(userId)
      setIsModalVisible(true)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await Api.User.deleteOne(userId)
      fetchUsers()
      enqueueSnackbar('User deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete user', { variant: 'error' })
    }
  }

  const handleFormSubmit = async (values: Model.User) => {
    try {
      if (currentUserId) {
        await Api.User.updateOne(currentUserId, values)
        enqueueSnackbar('User updated successfully', { variant: 'success' })
      } else {
        await Api.User.createOne(values)
        enqueueSnackbar('User added successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      fetchUsers()
    } catch (error) {
      enqueueSnackbar('Failed to submit form', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Model.User) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>User Management</Title>
      <Text>
        Manage user accounts, roles, and permissions within the Fleet Master
        application.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddUser}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />
      <Modal
        title={currentUserId ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
