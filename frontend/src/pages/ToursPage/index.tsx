import {FC, useEffect, useState, createElement, useContext} from "react";
import {Button, Carousel, List, notification, PageHeader, Row, Space, Typography} from "antd";
import {StarOutlined} from '@ant-design/icons';
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

  return <div style={{padding: '16px'}}>
    <PageHeader title={<Typography.Title level={2}>Доступные туры</Typography.Title>}/>
    <List
      itemLayout="vertical"
      size="large"
      loading={loading}
      dataSource={data}

      renderItem={(item: any) => (
        <List.Item
          key={item.id}
          extra={<><Row justify='end'><Typography.Title level={3}>{`${item?.price} $`}</Typography.Title></Row><Row>{
            authContext?.authenticated ?
              <Button type='link' onClick={() => handleClick(item?.id)}
                      style={{paddingRight: 0}}>Заказать</Button> : null}</Row></>
          }
        >
          <List.Item.Meta
            avatar={<div style={{width:'200px'}}><Carousel>{item?.images?.map((image: any) => <div><img
              src={`/images/${image?.image}`} style={{width: '200px'}}/>
            </div>)}</Carousel></div>}
            title={item?.country}
            description={<><Row>{item?.hotel}</Row><Row><IconText icon={StarOutlined} text={item?.star}
                                                                  key="list-vertical-star-o"/></Row></>}

          />
          {item.content}
        </List.Item>
      )}
    />
    <OrderModal visible={!!selected} onOk={handleOrder} onCancel={() => setSelected(undefined)}/>
  </div>
}