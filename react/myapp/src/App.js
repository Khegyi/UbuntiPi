import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

import { Button, Table } from "antd";
import 'antd/dist/antd.css'



function App() {

const [list, SetList] = useState([]);
const [newTodo, SetNewTodo] = useState({});
/* const [filter, SetFilter] = useState({ done: false}); */



const columns = [
  {
      title: "Name",
      dataIndex: "site_display_name",
      filters: [
          {
              text: "Joe",
              value: "Joe"
          }
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
          record.site_display_name.includes(value),
      sorter: (a, b) => a.name - b.name,
      width: "30%"
  },
  {
      title: "Status",
      dataIndex: "status"
  },
  {
      title: "Opti Site Id",
      dataIndex: "opti_site_id"
  },
  {
      title: "IBB Site Id",
      dataIndex: "ibb_site_id"
  },
  {
      title: "Appnexus Publisehr Id",
      dataIndex: "appnexus_publisher_id"
  },
  {
      title: "Ad Slot Id",
      dataIndex: "adSlotID0"
  },
  {
      title: "Teads Website Id",
      dataIndex: "teads_website_id"
  }
];

async function getUser(filter) {
  
  try {
    if(filter==="done"){
      let response = await axios({
        method: 'post',
        url: 'http://192.168.0.111:4000/api/test',
        data: filter
      });
      console.log(response.data);
      SetList(response.data);
    }else{
      let response = await axios({
        method: 'get',
        url: 'http://192.168.0.111:4000/api/test',
      });
      console.log(response.data);
      SetList(response.data);
    }

    console.log(filter);

    console.log('reload');

  } catch (error) {
    console.error(error);
  }

}

async function createTodoApi(data) {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://192.168.0.111:4000/api/add_todo',
      data: data
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
      method: 'delete',
      url: 'http://192.168.0.111:4000/api/delete',
      data: {id: id}
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
      method: 'patch',
      url: 'http://192.168.0.111:4000/api/modify_todo',
      data: data
    });

    console.log(response);
     cb();
  } catch (error) {
    console.error(error);
  }
}


function modifyNewTodo(e){
  const tempObj = {...newTodo};
  tempObj[e.target.name] = e.target.value
  console.log(tempObj);
  SetNewTodo(tempObj);

}

function completeTodo(id){
  const data = {id, modifer: {done: true,  status: "Done"}};
  console.log("set done: " + id)
  modifyTodoApi(data, getUser);
}

function deleteTodo(id){
  console.log("delete: " + id);
  deleteTodoApi(id, getUser);
  
}

function createTodo() {
  if(Object.keys(newTodo).length !== 0){
   createTodoApi(newTodo);
    console.log("cre")
    getUser();
  }else{
    console.log("empty")
  }
}

useEffect(() => {
  getUser();

}, [])

  return (
    <div className="App">
      <header className="App-header">
      <Button name="refresh" onClick={ () => getUser()} value='refresh'>Refresh</ Button>
      <input type="button" name="filter" onClick={ () => getUser("done")} value='filter' />
       <div>
         <input type="text" name="name" onChange={(e) =>modifyNewTodo(e)} placeholder='name'/>
         <input type="text" name="description" onChange={(e) =>modifyNewTodo(e)} placeholder='description'/>
         <input type="date" name="dueDate"  onChange={(e) =>modifyNewTodo(e)} />
        <input type="button" name="create" onClick={ () => createTodo()} value='Add' />
       </div>
        <div>
          {list.map((tet)=>{
            return (
              <div data-isdone={tet.done} key={tet._id}><div>{tet.name}{tet.description}{tet.dueDate}{tet.status}<button onClick={ () => completeTodo(tet._id)}>Done</button><button onClick={ () => deleteTodo(tet._id)}>delete</button></div></div>
            )
          })}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
