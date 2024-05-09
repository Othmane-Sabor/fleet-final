'use client'
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Modal,
  Input,
  Select,
  Space,
  Form,
} from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;
import { useAuthentication } from '@web/modules/authentication';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api, Model } from '@web/domain';
import { PageLayout } from '@web/layouts/Page.layout';

export default function AlertsPage() {
  const router = useRouter();
  const params = useParams<any>();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const { enqueueSnackbar } = useSnackbar();
  const [alerts, setAlerts] = useState<Model.Alert[]>([]);
  const [vehicles, setVehicles] = useState<Model.Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>();

  useEffect(() => {
    if (userId) {
      fetchAlerts();
      fetchVehicles();
    }
  }, [userId]);

  const fetchVehicles = async () => {
    try {
      const vehiclesData = await Api.Vehicle.findMany();
      setVehicles(vehiclesData);
    } catch (error) {
      enqueueSnackbar('Failed to fetch vehicles', { variant: 'error' });
    }
  };

  const fetchAlerts = async () => {
    try {
      const userAlerts = await Api.Alert.findManyByVehicleId(userId, {
        includes: ['vehicle'],
      });
      setAlerts(userAlerts);
    } catch (error) {
      enqueueSnackbar('Failed to fetch alerts', { variant: 'error' });
    }
  };

  const handleDeleteAlert = (alertId: string) => {
    confirm({
      title: 'Are you sure delete this alert?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk: async () => {
        try {
          await Api.Alert.deleteOne(alertId);
          fetchAlerts();
          enqueueSnackbar('Alert deleted successfully', { variant: 'success' });
        } catch (error) {
          enqueueSnackbar('Failed to delete alert', { variant: 'error' });
        }
      },
    });
  };

  const handleCreateAlert = async () => {
    if (!selectedVehicleId) {
      enqueueSnackbar('Please select a vehicle first.', { variant: 'error' });
      return;
    }
    try {
      await Api.Alert.createOneByVehicleId(selectedVehicleId, { message: 'New alert', criticality: 'High' });
      fetchAlerts();
      enqueueSnackbar('Alert created successfully, including Vehicle ID.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to create alert', { variant: 'error' });
    }
  };

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Vehicle Alerts Management</Title>
      <Text type="secondary">
        Manage and view all vehicle alerts and notifications.
      </Text>
      <Select placeholder="Select a vehicle" style={{ width: 200, marginBottom: 16 }} onChange={setSelectedVehicleId}>
        {vehicles.map(vehicle => (
          <Option key={vehicle.id} value={vehicle.id}>{vehicle.model}</Option>
        ))}
      </Select>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreateAlert}
        style={{ marginBottom: 16 }}
      >
        Add Alert
      </Button>
      <Row gutter={16}>
        {alerts?.map(alert => (
          <Col key={alert.id} span={8}>
            <Card
              title={`Alert for ${alert.vehicle?.model}`}
              extra={
                <Button type="link" onClick={() => handleDeleteAlert(alert.id)}>
                  Delete
                </Button>
              }
            >
              <p>
                <Text strong>Message:</Text> {alert.message}
              </p>
              <p>
                <Text strong>Criticality:</Text> {alert.criticality}
              </p>
              <p>
                <Text strong>Date:</Text>{' '}
                {dayjs(alert.dateCreated).format('YYYY-MM-DD')}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
}
