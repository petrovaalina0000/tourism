import {Form, InputNumber, Modal} from "antd";
import {FC} from "react";

type Props = {
  visible?: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
}

export const OrderModal: FC<Props> = ({visible, onOk, onCancel}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => onOk(values))
  }

  return <Modal visible={visible} onOk={handleOk} onCancel={onCancel} title='Заказать тур' centered forceRender>
    <Form layout='vertical' form={form}>
      <Form.Item name='persons' label='Количество человек' rules={[{required: true}]} initialValue={1}>
        <InputNumber maxLength={2} min={1} max={15} style={{width: '100%'}}/>
      </Form.Item>
      <Form.Item name='days' label='Дней' rules={[{required: true}]} initialValue={1}>
        <InputNumber maxLength={2} min={1} max={30} style={{width: '100%'}}/>
      </Form.Item>
    </Form>
  </Modal>
}