'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Button, Spin, Alert } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TaskDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [task, setTask] = useState<Model.Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await Api.Task.findOne(params.id, {
          includes: ['assignedUser', 'vehicle'],
        })
        setTask(taskData)
        setLoading(false)
      } catch (err) {
        enqueueSnackbar('Failed to fetch task details', { variant: 'error' })
        setError('Failed to load task data')
        setLoading(false)
      }
    }

    if (params.id) {
      fetchTask()
    }
  }, [params.id])

  const handleEditTask = () => {
    router.push(`/tasks/edit/${params.id}`)
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Task Details</Title>
      <Text type="secondary">View and manage the details of the task.</Text>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        task && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Description">
              {task.description}
            </Descriptions.Item>
            <Descriptions.Item label="Due Date">
              {dayjs(task.dueDate).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{task.status}</Descriptions.Item>
            <Descriptions.Item label="Assigned User">
              {task.assignedUser?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle">
              {task.vehicle?.model}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {dayjs(task.dateCreated).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {dayjs(task.dateUpdated).format('YYYY-MM-DD')}
            </Descriptions.Item>
          </Descriptions>
        )
      )}
      <Button type="primary" icon={<EditOutlined />} onClick={handleEditTask}>
        Edit Task
      </Button>
    </PageLayout>
  )
}
