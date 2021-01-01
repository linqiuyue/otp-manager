import React, { FC, useCallback, useEffect } from "react";

import { Form, Input, message, Modal } from "antd";

import {
  ItemInput,
  ItemQuery,
  useUpdateItemMutation,
} from "../generated/graphql";

interface EditItemModalProps {
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  data?: ItemQuery;
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

export const EditItemModal: FC<EditItemModalProps> = ({
  visible,
  onOk,
  onCancel,
  data,
}) => {
  const [form] = Form.useForm();

  const { validateFields } = form;

  const [updateItem, { loading }] = useUpdateItemMutation();

  const handleOk = useCallback(async () => {
    const input = await validateFields();

    if (data) {
      try {
        await updateItem({
          variables: { token: data.item.token, input: input as ItemInput },
        });
        message.success("成功");
      } catch (error) {
        console.log(error);
      }
    }

    if (onOk) {
      onOk();
    }
  }, [data, onOk, updateItem, validateFields]);

  useEffect(() => {
    form.setFieldsValue({
      name: data?.item.name,
      secret: data?.item.secret,
      backupCodes: data?.item.backupCodes,
    });
  }, [data, form]);

  return (
    <Modal
      title="编辑"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      getContainer={false}
    >
      <Form
        labelAlign="right"
        form={form}
        initialValues={{
          name: data?.item.name,
          secret: data?.item.secret,
          backupCodes: data?.item.backupCodes,
        }}
        {...formItemLayout}
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label="密钥"
          name="secret"
          rules={[
            {
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
