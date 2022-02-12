import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import * as dayjs from "dayjs";
import NewItemModal from "./NewItemModal";
import EditItemModal from "./EditItemModal";
import EditableTable from "./EditableTable";
import { Select, Switch, DatePicker, Space, Button, Input, Table } from "antd";
import { Row, Col, Divider } from "antd";
import PieChart from "./PieChart";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function Main() {
  const [list, SetList] = useState([]);
  const [ogList, SetOgList] = useState([]);
  const [allSum, SetAllSum] = useState(0);
  const [newTodo, SetNewTodo] = useState({});
  const [sumByType, setsumByType] = useState([]);
  const [pieData, setpieData] = useState({});
  const [editData, seteditData] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);


  
  /* const [filter, SetFilter] = useState({ done: false}); */

  const { Option } = Select;
  function onChange(pagination, filters, sorter, extra) {
    console.log("gte")
    calcAllSum(extra.currentDataSource);
    if (filters.type != undefined) {
      if (filters.type.length == 1) {
        calcSumWithOneType(extra.currentDataSource);
      }else{
        calcSumByType(extra.currentDataSource);
      }
    } else {
      calcSumByType(extra.currentDataSource);
    }
    console.log("params", pagination, filters, sorter, extra);
  }
  function onDateFilter(data) {
    let tempList = [...ogList];
    if (data != null) {
      const res = tempList.filter((listitem) => {
        return dayjs(data).isSame(listitem.dueDate, "month");
      });
      tempList = res;
    }
    calcAllSum(tempList);
    calcSumByType(tempList);
    SetList(tempList);
    console.log(tempList);
  }

  function editTodo (data) {
    seteditData(data);
    console.log(data)
    //showEditDrawer();
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render:(am)=>am.toLocaleString('hu')+'ft'
    },
    /*    {
      title: "Status",
      dataIndex: "status",
    }, */
    {
      title: "Date",
      dataIndex: "dueDate",
      sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
    },
    {
      title: "Description",
      dataIndex: "description",
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
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editTodo(record)} >Edit</Button>
          <Button type="delete" danger onClick={() => deleteTodo(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  async function getUser(filter) {
    try {
      let summa = 0;
      if (filter === "done") {
        let response = await axios({
          method: "post",
          url: "http://192.168.0.111:4000/api/test",
          data: filter,
        });
        console.log(response.data);

        response.data.map((site) => {
          site.key = site._id;
          /*   site.periodic = site.periodic ? "Rendszeres" : "Egyszeri"; */
          summa += parseInt(site.amount);
        });
        SetList(response.data);
        SetOgList(response.data);
      } else {
        let response = await axios({
          method: "get",
          url: "http://192.168.0.111:4000/api/test",
        });
        console.log(response.data);
        response.data.map((site) => {
          site.key = site._id;
          /*           site.periodic = site.periodic ? "Rendszeres" : "Egyszeri";
          site.periodic = site.periodic ? "Rendszeres" : "Egyszeri"; */
          summa += parseInt(site.amount);
          SetOgList(response.data);
        });
        calcAllSum(response.data);
        calcSumByType(response.data);
        SetList(response.data);
      }

      console.log(filter);

      console.log("reload");
    } catch (error) {
      console.error(error);
    }
  }

  function calcSumWithOneType(newlist) {
    let typesum = {};
    newlist.map((listitem) => {
      typesum[listitem.name] = parseInt(listitem.amount);
      // summa += parseInt(listitem.amount);
    });
    setpieData(typesum);
  }

  function calcSumByType(newlist) {
    let typesum = {};
    newlist.map((listitem) => {
      if (typesum[listitem.type] === undefined) {
        typesum[listitem.type] = parseInt(listitem.amount);
      } else {
        typesum[listitem.type] += parseInt(listitem.amount);
      }
      // summa += parseInt(listitem.amount);
    });
    setsumByType(typesum);
    setpieData(typesum);
  }

  function calcAllSum(newlist) {
    let summa = 0;
    newlist.map((listitem) => {
      summa += parseInt(listitem.amount);
    });
    SetAllSum(summa);
  }

  async function createTodoApi(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://192.168.0.111:4000/api/add_todo",
        data: data,
      });
      getUser();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodoApi(id, cb) {
    try {
      const response = await axios({
        method: "delete",
        url: "http://192.168.0.111:4000/api/delete",
        data: { id: id },
      });

      console.log(response);
      cb();
    } catch (error) {
      console.error(error);
    }
  }

  async function modifyTodoApi(data) {
    try {
      const response = await axios({
        method: "patch",
        url: "http://192.168.0.111:4000/api/modify_todo",
        data: data,
      });

      console.log(response);
      getUser();
    } catch (error) {
      console.error(error);
    }
  }

  function modifyNewTodo(e, t, name) {
    const tempObj = { ...newTodo };
    const tempName = name || e.target.name;
    const tempVal = (t ? t.value : "") || e.target.value;
    tempObj[tempName] = tempVal;
    console.log(tempObj);
    SetNewTodo(tempObj);
  }

  function modifyRegular(e, name) {
    const tempObj = { ...newTodo };
    tempObj[name] = e;
    console.log(tempObj);
    SetNewTodo(tempObj);
  }

  function completeTodo(id) {
    const data = { id, modifer: { done: true, status: "Done" } };
    console.log("set done: " + id);
    modifyTodoApi(data, getUser);
  }

  function deleteTodo(id) {
    console.log("delete: " + id);
    deleteTodoApi(id, getUser);
  }

  function createTodo() {
    if (Object.keys(newTodo).length !== 0) {
      createTodoApi(newTodo);
      console.log("cre");
      getUser();
    } else {
      console.log("empty");
    }
  }

  const showDrawer = () => {
    setisModalOpen(true);
  //  console.log("open");
  };
  
  const onCloseDrawer = () => {
    setisModalOpen(false);
   // seteditData({});
  };




  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="table_btns">
          <div className="sum_num">Total: {allSum.toLocaleString('hu') }Ft</div>
          <DatePicker onChange={(e) => onDateFilter(e)} picker="month" />
          <Button name="refresh" onClick={() => getUser()} value="refresh">
            Refresh
          </Button>
          <Button
            type="button"
            name="filter"
            onClick={() => getUser("done")}
            value="filter"
          >
            Filter
          </Button>
          <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            New Spending
          </Button>
          <NewItemModal createFn={createTodoApi} modifyFn={modifyTodoApi} closeModal={onCloseDrawer}  isOpen={isModalOpen} />
      
        </div>

      </header>
      <div className="container">
        <Row>
        <Col className="gutter-row" span={6}>
            <PieChart datas={pieData} />
          </Col>
          <Col className="gutter-row" span={18}>
          {/*  <Table columns={columns} dataSource={list} onChange={onChange} /> */}
          <EditableTable   columns={columns} dataSource={list} onChange={onChange} deleteTodo={deleteTodo} editTodo={editTodo} />
          </Col>
  
        </Row>

      </div>
    </div>
  );
}

export default Main;
