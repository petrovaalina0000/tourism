import {FC, useEffect, useState, createElement} from "react";
import {List, PageHeader, Space, Typography} from "antd";
import {useNavigate} from 'react-router-dom'
import {StarOutlined, UserOutlined, DollarOutlined, CalendarOutlined} from '@ant-design/icons';

const IconText = ({icon, text}: any) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

export const OrdersPage: FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('/orders', {
      method: 'get', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => response.json()).then(value => setData(value)).finally(() => setLoading(false));
  }, []);

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
          extra={<Typography.Title level={3}>{`${item?.tour?.price * item?.persons * item?.days} $`}</Typography.Title>}
        >
          <List.Item.Meta
            title={item?.tour?.country}
            description={item?.tour?.hotel}

          />

        </List.Item>
      )}
    />
  </>
}