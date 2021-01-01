import React, { FC, useCallback } from "react";

import { Form, Input, message, Modal } from "antd";
import { ItemInput, useCreateItemMutation } from "../generated/graphql";

interface CreateItemModalProps {
  visible: boolean;
  onOk?: (name: string) => void;
  onCancel?: () => void;
}

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export const CreateItemModal: FC<CreateItemModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { validateFields } = form;

  const [createItem, { loading }] = useCreateItemMutation();
  const handleOk = useCallback(async () => {
    const input = await validateFields();

    try {
      await createItem({ variables: { input: input as ItemInput } });
      message.success("成功");
      if (onOk) {
        onOk(input.name);
      }
    } catch (error) {
      console.log(error);
    }
    form.resetFields();
  }, [createItem, form, onOk, validateFields]);

  return (
    <Modal
      title="添加"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      getContainer={false}
    >
      <Form form={form} {...formItemLayout}>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: "请填写名称！" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密钥"
          name="secret"
          rules={[
            {
              required: true,
              pattern: /^[0-9A-Z]{32}$/,
              message: "密钥只能是 32 位大写字母或数字",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item label="备份验证码" name="backupCodes">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
