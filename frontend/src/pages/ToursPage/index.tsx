import {FC, useEffect, useState, createElement, useContext} from "react";
import {Button, List, notification, Space} from "antd";
import {StarOutlined, MessageOutlined} from '@ant-design/icons';
import {AuthContext} from "../../components/AuthProvider";
import {OrderModal} from "./OrderModal";

const IconText = ({icon, text}: any) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

export const ToursPage: FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch('/tours', {
      method: 'get', headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(value => setData(value)).finally(() => setLoading(false));
  }, []);

  const handleClick = (id: string) => {
    setSelected(id);
  }

  const handleOrder = async (values: any) => {
    const response = await fetch('/order', {
      method: 'put', body: JSON.stringify({...values, tour: selected}), headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      notification.success({message: "Заказ успешно оформлен"});
      setSelected(undefined);
    } else {
      notification.error({message: data?.message})
    }
  }

  return <><List
    itemLayout="vertical"
    size="large"
    loading={loading}
    dataSource={data}

    renderItem={(item: any) => (
      <List.Item
        key={item.id}
        actions={[
          <IconText icon={StarOutlined} text={item?.star} key="list-vertical-star-o"/>,
          <IconText icon={MessageOutlined} text={item?.price} key="list-vertical-message"/>,
        ]}
        extra={
          authContext?.authenticated ?
            <Button type='primary' onClick={() => handleClick(item?.id)}>Заказать</Button> : null
        }
      >
        <List.Item.Meta
          title={item?.country}
          description={item?.hotel}

        />
        {item.content}
      </List.Item>
    )}
  />
    <OrderModal visible={!!selected} onOk={handleOrder} onCancel={() => setSelected(undefined)}/>
  </>
}