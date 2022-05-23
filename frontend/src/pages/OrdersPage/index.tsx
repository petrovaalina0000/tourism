import {FC, useEffect, useState, createElement} from "react";
import {Button, List, notification, PageHeader, Row, Space, Typography} from "antd";
import {useNavigate} from 'react-router-dom'
import {StarOutlined, UserOutlined, DollarOutlined, CalendarOutlined} from '@ant-design/icons';
import {EditModal} from "./EditModal";

const IconText = ({icon, text}: any) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

export const OrdersPage: FC = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>(undefined)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadItems = () => {
    setLoading(true);
    fetch('/orders', {
      method: 'get', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => response.json()).then(value => setData(value)).finally(() => setLoading(false));
  }

  useEffect(() => {
    loadItems();
  }, []);

  const handleDeleteClick = (id: number) => {
    setLoading(true);
    setData([]);
    fetch(`/order/${id}`, {
      method: 'delete', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(() => loadItems()).finally(() => setLoading(false));
  }

  const handleEditClick = (data: any) => {
    setSelected(data);
  }

  const handleOkClick = async (values: any) => {
    setLoading(true);
    const response = await fetch(`/order/${values?.id}`, {
      method: 'post',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      notification.success({message: "Заказ успешно изменен"});
      setSelected(undefined);
      loadItems()
    } else {
      notification.error({message: data?.message});
      setLoading(false);
    }
  }

  return <>
    <PageHeader title='Мои заказы' onBack={() => navigate(-1)}/>
    <List
      itemLayout="vertical"
      size="large"
      loading={loading}
      dataSource={data}

      renderItem={(item: any) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon={StarOutlined} text={item?.tour?.star} key="list-vertical-star-o"/>,
            <IconText icon={DollarOutlined} text={item?.tour?.price} key="list-vertical-message"/>,
            <IconText icon={UserOutlined} text={item?.persons} key="list-vertical-message"/>,
            <IconText icon={CalendarOutlined} text={item?.days} key="list-vertical-message"/>,
          ]}
          extra={<>
            <Row justify='end'>
              <Typography.Title
                level={3}>{`${item?.tour?.price * item?.persons * item?.days} $`}</Typography.Title>
            </Row>
            <Row justify='end'>
              <Button type='link'
                      onClick={() => handleEditClick(item)}
                      style={{paddingRight: 0}}>Редактировать</Button>
            </Row>
            <Row justify='end'>
              <Button type='text' danger onClick={() => handleDeleteClick(item?.id)}
                      style={{paddingRight: 0}}>Удалить</Button></Row>

          </>}
        >
          <List.Item.Meta
            title={item?.tour?.country}
            description={item?.tour?.hotel}

          />

        </List.Item>
      )}
    />
    <EditModal visible={!!selected} data={selected} onOk={handleOkClick} onCancel={() => setSelected(undefined)}/>
  </>
}