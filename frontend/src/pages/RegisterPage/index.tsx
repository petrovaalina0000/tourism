import {FC} from "react";
import {Button, Col, Form, Input, notification, Row, Typography} from "antd";
import styles from './index.module.css';
import {useNavigate} from "react-router-dom";

export const RegisterPage: FC = () => {
  const [form] = Form.useForm();
  const password = Form.useWatch('password', form);
  const navigate = useNavigate();

  const handleClick = () => {
    form.validateFields().then(async values => {
      const response = await fetch('/auth/register', {
        method: 'post', body: JSON.stringify(values), headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        notification.success({message: "Пользователь успешно зарегестрирован"});
        navigate('/',{replace:true});
      } else {
        notification.error({message: data?.message})
      }
    })
  }

  return <Row className={styles.container} align='middle'>
    <Col span={8}/>
    <Col flex={1}><Form form={form} layout='vertical' validateMessages={{required:'Поле обязательно для заполнения'}}>
      <Form.Item noStyle>
        <Typography.Title level={2}>Регистрация</Typography.Title><br/>
      </Form.Item>
      <Form.Item name='login' label='Имя пользователя' rules={[{required: true}]}>
        <Input maxLength={50}/>
      </Form.Item>
      <Form.Item name='firstName' label='Имя' rules={[{required: true}]}>
        <Input maxLength={50}/>
      </Form.Item>
      <Form.Item name='lastName' label='Фамилия' rules={[{required: true}]}>
        <Input maxLength={50}/>
      </Form.Item>
      <Form.Item name='password' label='Пароль' rules={[{required: true}]}>
        <Input.Password maxLength={50}/>
      </Form.Item>
      <Form.Item name='passwordConfirm' label='Пароль еще раз' rules={[{required: true},{validator: async (rule, value) => {
        if (value !== password)
        throw new Error('Пароли не совпадают');
        }}]}>
        <Input.Password maxLength={50}/>
      </Form.Item>
      <Form.Item noStyle>
        <Button type='primary' onClick={handleClick}>Зарегестрироваться</Button>
      </Form.Item>
    </Form>
    </Col>
    <Col span={8}/>
  </Row>
}