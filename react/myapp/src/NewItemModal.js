import React, { useState,useEffect, useRef } from "react";
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

function NewItemModal({createFn, closeModal, isOpen }) {

/* 
const edit = useRef(editDataRecord)
 */
 // console.log(editDataRecord);


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

      <Drawer
        title="Create a new account"
        width={720}
        onClose={closeModal}
        visible={isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeModal}>Cancel</Button>
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
              <Option value="lak??s">Lak??s</Option>
              <Option value="sz??rakoz??s">Sz??rakoz??s</Option>
              <Option value="??lelmiszer">??lelmiszer</Option>
              <Option value="szem??lyes">Szem??lyes</Option>
              <Option value="egy??b">Egy??b</Option>
              <Option value="aj??nd??k/adom??ny">Aj??nd??k/Adom??ny</Option>
              <Option value="k??zleked??s">K??zleked??s</Option>
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
          <Radio.Button value="B??lint">B??lint</Radio.Button>
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
