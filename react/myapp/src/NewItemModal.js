import React, { useState } from "react";
import * as dayjs from 'dayjs'
import {
  Drawer,
  Form,
  Button,
  Col,
  Radio,
  InputNumber,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

function NewItemModal({createFn, getUserFn }) {

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const onFinish = (values) => {
    const formdata = values.user;
    console.log(formdata);
    formdata['dueDate'] = dayjs(formdata['dueDate']).format('YYYY-MM-DD');
    createFn(formdata);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const { Option } = Select;
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "type"]}
            label="Type"
            /*             rules={[
              {
                type: "email",
              },
            ]} */
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Type"
              name="type"
              optionFilterProp="children"
              /*   onSelect={(e, t) => modifyNewTodo(e, t, "type")} */
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="lakás">Lakás</Option>
              <Option value="szórakozás">Szórakozás</Option>
              <Option value="élelmiszer">Élelmiszer</Option>
              <Option value="személyes">Személyes</Option>
              <Option value="egyéb">Egyéb</Option>
              <Option value="ajándék/adomány">Ajándék/Adomány</Option>
              <Option value="közlekedés">Közlekedés</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={["user", "amount"]}
            label="Amount"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
              },
            ]}
          >
            <InputNumber addonAfter="HUF" />
          </Form.Item>
          <Form.Item name={["user", "dueDate"]} label="Date" {...config}>
            <DatePicker />
          </Form.Item>
          <Form.Item name={["user", "description"]} label="Description">
            <Input.TextArea />
          </Form.Item>


      <Form.Item
       name={["user", "owner"]}
        label="Owner"
        rules={[{ required: true, message: 'Please pick an owner!' }]}
      >
        <Radio.Group>
          <Radio.Button value="Aliz">Aliz</Radio.Button>
          <Radio.Button value="Bálint">Bálint</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
       name={["user", "periodic"]}
        label="Periodic"
        rules={[{ required: true, message: 'Please pick an one!' }]}
      >
        <Radio.Group>
          <Radio.Button value="Egyszeri">Egyszeri</Radio.Button>
          <Radio.Button value="Rendszeres">Rendszeres</Radio.Button>
        </Radio.Group>
      </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default NewItemModal;
