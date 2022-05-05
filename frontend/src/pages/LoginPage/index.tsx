import {FC, useContext} from "react";
import {Button, Form, Input, notification} from "antd";
import {AuthContext} from "../../components/AuthProvider";

export const LoginPage: FC = () => {
  const [form] = Form.useForm();

  const authContext = useContext(AuthContext);

  const handleClick = () => {
    form.validateFields().then(async values => {
      const response = await fetch('/auth/login', {
        method: 'post', body: JSON.stringify(values), headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        authContext?.login(data?.access_token);
      } else {
        notification.error({message: data?.message})
      }
      console.log(response, data);
    })
  }

  return <Form form={form} layout='vertical'>
    <Form.Item name='login' label='Имя пользователя' rules={[{required: true}]}>
      <Input maxLength={50}/>
    </Form.Item>
    <Form.Item name='password' label='Пароль' rules={[{required: true}]}>
      <Input.Password maxLength={50}/>
    </Form.Item>
    <Form.Item noStyle>
      <Button type='primary' onClick={handleClick}>Войти</Button>
    </Form.Item>
  </Form>
}