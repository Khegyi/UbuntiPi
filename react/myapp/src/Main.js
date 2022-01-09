import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import { Button, Input, Table } from "antd";
import "antd/dist/antd.css";
import { Select, Switch } from "antd";

function Main() {
  const [list, SetList] = useState([]);
  const [allSum, SetAllSum] = useState(0);
  const [newTodo, SetNewTodo] = useState({ periodic:false});
  /* const [filter, SetFilter] = useState({ done: false}); */

  const { Option } = Select;
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
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
/*     {
      title: "Done",
      dataIndex: "done",
    }, */
    {
      title: "Periodic",
      dataIndex: "periodic",
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
          site.periodic = site.periodic ? "Rendszeres" : "Egyszeri";
          summa += parseInt(site.amount); 
        });
        SetAllSum(summa);
        SetList(response.data);
      } else {
        let response = await axios({
          method: "get",
          url: "http://192.168.0.111:4000/api/test",
        });
        console.log(response.data);
        response.data.map((site) => {
          site.key = site._id;
          site.periodic = site.periodic ? "Rendszeres" : "Egyszeri";
          summa += parseInt(site.amount); 
        });
        SetAllSum(summa);
        SetList(response.data);
      }

      console.log(filter);

      console.log("reload");
    } catch (error) {
      console.error(error);
    }
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

  async function modifyTodoApi(data, cb) {
    try {
      const response = await axios({
        method: "patch",
        url: "http://192.168.0.111:4000/api/modify_todo",
        data: data,
      });

      console.log(response);
      cb();
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
        <div>
          <Input
            type="text"
            name="name"
            onChange={(e) => modifyNewTodo(e)}
            placeholder="name"
          />
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Type"
            name="type"
            optionFilterProp="children"
            onSelect={(e, t) => modifyNewTodo(e, t, "type")}
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
          <Input
            type="text"
            name="description"
            onChange={(e) => modifyNewTodo(e)}
            placeholder="description"
          />
          <Input
            type="date"
            name="dueDate"
            onChange={(e) => modifyNewTodo(e)}
          />
          <Input
            type="text"
            name="amount"
            placeholder="amount"
            onChange={(e) => modifyNewTodo(e)}
          />
          <Switch
            name="periodic"
            checkedChildren="Rendszeres"
            unCheckedChildren="Egyszeri"
            onChange={(e) => modifyRegular(e, "periodic")}
          />
          <Button
            type="button"
            name="create"
            onClick={() => createTodo()}
            value="Add"
          >
            Add
          </Button>
        </div>

        <div>
          <Table columns={columns} dataSource={list} onChange={onChange} />
        </div>
        <div>
          Total: {allSum} HUF
        </div>
        <div>
          {list.map((tet) => {
            return (
              <div data-isdone={tet.done} key={tet._id}>
                <div>
                  {tet.name}
                  {tet.description}
                  {tet.dueDate}
                  {tet.status}
                  <Button onClick={() => completeTodo(tet._id)}>Done</Button>
                  <Button onClick={() => deleteTodo(tet._id)}>Delete</Button>
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default Main;
