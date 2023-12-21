import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { Alert, Space, Button } from "antd";
import "./Todolists.scss";
import privateAxios from "../config/Axios";
export default function Todolists() {
  const [todolists, setTodolists] = useState([]);
  const [flag, setFlag] = useState(0);
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const [todo, setTodo] = useState({
    name: "",
    status: 0,
  });
  useEffect(() => {
    const res = axios.get("http://localhost:8080/todolists");
    res.then((res) => setTodolists(res.data.data));
  }, [flag]);
  useEffect(() => {
    setTimeout(() => {
      setAlert({
        type: "success",
        message: "",
      });
    }, 3000);
  }, [alert]);
  const addNewToDo = async () => {
    if (todo.id) {
      try {
        await privateAxios
          .put(`http://localhost:8080/todolists/${todo.id}`, todo)
          .then((res) => {
            setAlert({
              type: res.data.type,
              message: res.data.message,
            });
            setFlag(flag + 1);
            setTodo({
              name: "",
              status: 0,
            });
          });
      } catch (error) {
        setAlert({
          type: error.response.data.type,
          message: error.response.data.message,
        });
        setTodo({
          name: "",
          status: 0,
        });
      }
    } else {
      try {
        await privateAxios
          .post("http://localhost:8080/todolists", todo)
          .then((res) => {
            setAlert({
              type: res.data.type,
              message: res.data.message,
            });
            setFlag(flag + 1);
            setTodo({
              name: "",
              status: 0,
            });
          });
      } catch (error) {
        console.log(error);
        setAlert({
          type: error.response.data.type,
          message: error.response.data.message,
        });
      }
    }
  };
  const deleeteItem = (id) => {
    try {
      const res = privateAxios.delete(`http://localhost:8080/todolists/${id}`);
      res.then((res) => {
        setFlag(flag + 1);
      });
    } catch (error) {
      setAlert({
        type: error.response.data.type,
        message: error.response.data.message,
      });
    }
  };
  const editItem = (item) => {
    setTodo(item);
  };
  const changeStatus = (checked, id) => {
    try {
      const status = checked ? 1 : 0;
      const res = privateAxios.put(
        `http://localhost:8080/todolists/edit/${id}`,
        {
          status: status,
        }
      );
      res.then((res) => {
        setFlag(flag + 1);
      });
    } catch (error) {
      setAlert({
        type: error.response.data.type,
        message: error.response.data.message,
      });
    }
  };
  return (
    <>
      <div className="container">
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          
          <Alert
            message={alert.message}
            type={alert.type}
            showIcon
            style={{
              width: "300px",
              visibility: alert.message ? "visible" : "hidden",
            }}
          />
        </Space>
        <div className="main">
          <div className="input">
            <h1>Todolists</h1>
            <input
              type="text"
              onChange={(e) => setTodo({ ...todo, name: e.target.value })}
              value={todo?.name}
            />
            <button className="button" onClick={addNewToDo}>
              {todo?.id ? "edit" : "add"}
            </button>
          </div>
          <div className="render">
            {todolists?.map((item, index) => (
              <div key={index.id} className="render-item">
                <p
                  style={{ textDecoration: item.status ? "line-through" : "" }}
                >
                  {item.name}
                </p>
                <p
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <input
                    type="checkbox"
                    onChange={(e) => changeStatus(e.target.checked, item.id)}
                    value={item.status}
                    checked={item.status}
                  />
                  <button onClick={() => editItem(item)}>
                    <span class="material-symbols-outlined">edit_note</span>
                  </button>
                  <button onClick={() => deleeteItem(item.id)}>
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
