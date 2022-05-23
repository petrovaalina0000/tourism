import {Form, InputNumber, Modal} from "antd";
import {FC, useEffect} from "react";

type Props = {
  visible?: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  data?: any;
}

export const EditModal: FC<Props> = ({visible, onOk, onCancel, data}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    visible ? form.setFieldsValue(data) : form.resetFields();
  }, [visible])

  const handleOk = () => {
    form.validateFields().then(values => onOk(values))
  }

  return <Modal visible={visible} onOk={handleOk} onCancel={onCancel} title='Редактировать тур' centered forceRender>
    <Form layout='vertical' form={form}>
      <Form.Item name='id' noStyle/>
      <Form.Item name='tour' noStyle/>
      <Form.Item name='user' noStyle/>
      <Form.Item name='persons' label='Количество человек' rules={[{required: true}]} initialValue={1}>
        <InputNumber maxLength={2} min={1} max={15} style={{width: '100%'}}/>
      </Form.Item>
      <Form.Item name='days' label='Дней' rules={[{required: true}]} initialValue={1}>
        <InputNumber maxLength={2} min={1} max={30} style={{width: '100%'}}/>
      </Form.Item>
    </Form>
  </Modal>
}