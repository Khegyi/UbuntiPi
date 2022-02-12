import React, { useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  DatePicker,
  Space,
  Button,
  Popconfirm,
  Form,
  Typography,
} from "antd";
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({ dataSource, onChange, editTodo, deleteTodo }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: "61fe8ff3da1a0e03a9570067",
      name: "Közös költség",
      type: "lakás",
      amount: 14055,
      dueDate: "2022-01-03",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe90d9da1a0e03a957006c",
      name: "Diákhitel",
      type: "egyéb",
      amount: 15000,
      dueDate: "2022-01-17",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe912fda1a0e03a957006d",
      name: "Lakás törlesztés",
      type: "lakás",
      amount: 97358,
      dueDate: "2022-01-17",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9160da1a0e03a957006e",
      name: "Gólya",
      type: "szórakozás",
      amount: 650,
      dueDate: "2022-01-17",
      description: "Sör",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9179da1a0e03a957006f",
      name: "Gólya",
      type: "szórakozás",
      amount: 1350,
      dueDate: "2022-01-18",
      description: "Sör",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe91b6da1a0e03a9570070",
      name: "Telefon Számla",
      type: "személyes",
      amount: 6052,
      dueDate: "2022-01-18",
      description: "barion",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9232da1a0e03a9570071",
      name: "Kinai",
      type: "élelmiszer",
      amount: 3650,
      dueDate: "2022-01-19",
      description: "Rizslap, leves, halszósz",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe927bda1a0e03a9570072",
      name: "Vaj",
      type: "élelmiszer",
      amount: 2420,
      dueDate: "2022-01-19",
      description: "Aranygaluskás csiga ",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe929fda1a0e03a9570073",
      name: "MVM Next Áram",
      type: "lakás",
      amount: 6759,
      dueDate: "2022-01-20",
      description: "",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9312da1a0e03a9570074",
      name: "Kinai",
      type: "élelmiszer",
      amount: 510,
      dueDate: "2022-01-22",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9336da1a0e03a9570075",
      name: "Fornetti",
      type: "élelmiszer",
      amount: 400,
      dueDate: "2022-01-24",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9366da1a0e03a9570076",
      name: "Internet",
      type: "lakás",
      amount: 7450,
      dueDate: "2022-01-24",
      description: "",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe940eda1a0e03a9570077",
      name: "Tong De He",
      type: "élelmiszer",
      amount: 1150,
      dueDate: "2022-01-24",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe942bda1a0e03a9570078",
      name: "SportKastely",
      type: "élelmiszer",
      amount: 1110,
      dueDate: "2022-01-24",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe947dda1a0e03a9570079",
      name: "Spar",
      type: "élelmiszer",
      amount: 3075,
      dueDate: "2022-01-25",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe94a4da1a0e03a957007a",
      name: "Tabak",
      type: "szórakozás",
      amount: 2579,
      dueDate: "2022-01-25",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe94b4da1a0e03a957007b",
      name: "Tabak",
      type: "szórakozás",
      amount: 2890,
      dueDate: "2022-01-26",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe94f2da1a0e03a957007d",
      name: "Buttlers",
      type: "ajándék/adomány",
      amount: 3490,
      dueDate: "2022-01-26",
      description: "Nórának ajándék",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe950cda1a0e03a957007e",
      name: "Müller",
      type: "ajándék/adomány",
      amount: 2690,
      dueDate: "2022-01-26",
      description: "Nórának ajándék",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe953fda1a0e03a957007f",
      name: "Tier",
      type: "közlekedés",
      amount: 470,
      dueDate: "2022-01-25",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9557da1a0e03a9570080",
      name: "Vin Market",
      type: "élelmiszer",
      amount: 2800,
      dueDate: "2022-01-25",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe95c8da1a0e03a9570082",
      name: "Gamepass",
      type: "szórakozás",
      amount: 2499,
      dueDate: "2022-01-25",
      description: "",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe95f1da1a0e03a9570083",
      name: "Emag",
      type: "személyes",
      amount: 23990,
      dueDate: "2022-01-25",
      description: "Külső vinyó",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9606da1a0e03a9570084",
      name: "Tabak",
      type: "szórakozás",
      amount: 570,
      dueDate: "2022-01-25",
      description: "energia ital",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9618da1a0e03a9570085",
      name: "Viki Vegyes",
      type: "élelmiszer",
      amount: 1500,
      dueDate: "2022-01-26",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe963cda1a0e03a9570086",
      name: "Miniso Corvin",
      type: "ajándék/adomány",
      amount: 1990,
      dueDate: "2022-01-26",
      description: "Mila ajándéka",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9651da1a0e03a9570087",
      name: "Spotify",
      type: "szórakozás",
      amount: 1990,
      dueDate: "2022-01-26",
      description: "",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe966dda1a0e03a9570088",
      name: "BKV jegy",
      type: "közlekedés",
      amount: 3000,
      dueDate: "2022-01-26",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe968bda1a0e03a9570089",
      name: "Emag",
      type: "személyes",
      amount: 5960,
      dueDate: "2022-01-28",
      description: "tölthető AAA elemek",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe96a3da1a0e03a957008a",
      name: "Bubi",
      type: "közlekedés",
      amount: 60,
      dueDate: "2022-01-31",
      description: "",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9702da1a0e03a957008b",
      name: "Gusta ",
      type: "élelmiszer",
      amount: 1440,
      dueDate: "2022-01-31",
      description: "ebéd",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe98fada1a0e03a957008c",
      name: "Víz számla",
      type: "lakás",
      amount: 4016,
      dueDate: "2022-01-25",
      owner: "Bálint",
      periodic: "Rendszeres",
      done: false,
      status: "Todo",
    },
    {
      key: "61fe9b34da1a0e03a957008d",
      name: "Vin Market",
      type: "élelmiszer",
      amount: 3210,
      dueDate: "2022-01-14",
      owner: "Bálint",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
    {
      _id: "6207baaa52d9cf4d12b25aab",
      name: "zdeztdf",
      type: "közlekedés",
      amount: 456789,
      dueDate: "2022-02-18",
      description: "tf",
      owner: "Aliz",
      periodic: "Egyszeri",
      done: false,
      status: "Todo",
    },
  ]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      amount: "",
      dueDate: "",
      description: "",
      owner: "",
      periodic: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      filters: [
        { text: "Lakás", value: "lakás" },
        { text: "Szórakozás", value: "szórakozás" },
        { text: "Élelmiszer", value: "élelmiszer" },
        { text: "Személyes", value: "személyes" },
        { text: "Egyéb", value: "egyéb" },
        { text: "Ajándék/Adomány", value: "ajándék/adomány" },
        { text: "Közlekedés", value: "közlekedés" },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.type.includes(value),
      sorter: (a, b) => a.type.localeCompare(b.type),
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (am) => am.toLocaleString("hu") + "ft",
      editable: true,
    },
    /*    {
      title: "Status",
      dataIndex: "status",
    }, */
    {
      title: "Date",
      dataIndex: "dueDate",
      sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      filters: [
        { text: "Bálint", value: "Bálint" },
        { text: "Aliz", value: "Aliz" },
      ],
      onFilter: (value, record) => record.owner.includes(value),
      sorter: (a, b) => a.owner.localeCompare(b.owner),
      editable: true,
    },
    {
      title: "Periodic",
      dataIndex: "periodic",
      filters: [
        { text: "Egyszeri", value: "Egyszeri" },
        { text: "Rendszeres", value: "Rendszeres" },
      ],
      onFilter: (value, record) => record.periodic.includes(value),
      sorter: (a, b) => a.periodic.localeCompare(b.periodic),
      editable: true,
    },
    /*     {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          
     
        </Space>
      ),
    }, */
    {
      title: "Action",
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="secondary"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="secondary">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <Button
              type="primary"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteTodo(record._id)}
            >
              <Button type="delete" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>

          /*           <Typography.Link >
            Edit
          </Typography.Link> */
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "amount" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        onChange={onChange}
        /*         pagination={{
          onChange: cancel,
        }} */
      />
    </Form>
  );
};

export default EditableTable;
