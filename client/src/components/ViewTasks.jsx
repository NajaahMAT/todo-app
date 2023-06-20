import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router-dom";

const ViewTasks = () => {
  const [todoData, setTodoData] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const [author, setAuthor] = useState();

  const options = {
    position: "bottom-right",
    style: {
      backgroundColor: "gray",
      border: "2px solid lightgreen",
      color: "white",
      fontFamily: "Menlo, monospace",
      fontSize: "20px",
      textAlign: "center",
    },
    closeStyle: {
      color: "lightcoral",
      fontSize: "16px",
    },
  };
  const [openSnackbar] = useSnackbar(options);

  const uniqueTask = () => {
    const getTaskUrl = process.env.REACT_APP_BACKEND_URL + "/task/user/64818f458c1d5391515764ce";

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Credentials': 'true',
    };

    setLoading(true);
    axios
      .get(
        getTaskUrl,
        {
          headers
        }
      )
      .then(function (response) {
        setLoading(false);
        setTodoData(response?.data);
        console.log(response?.data);
      })
      .catch(function (error) {
        setLoading(false);
      })
      .then(function () {
        // always executed
      });
  };

  const getUser = () => {
    const getUserUrl = process.env.REACT_APP_BACKEND_URL + "/user/64818f458c1d5391515764ce";

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Credentials': 'true',
    };

    axios
      .get(
        getUserUrl,
        //{},
        {
          headers
        }
      )
      .then(function (response) {
        setAuthor(response?.data);
        console.log(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    const User = localStorage.getItem("user");
    if (!User) {
      navigate("/login");
    }
    uniqueTask();
  }, []);

  const deleteBtn = (task) => {
    const deleteTaskUrl = process.env.REACT_APP_BACKEND_URL + "/task/" + task.id;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Credentials': 'true',
    };

    setDeleteLoading(true);
    axios
      .delete(
        deleteTaskUrl,
        {
          headers
        }
      )
      .then(function (response) {
        setDeleteLoading(false);
        openSnackbar(response?.data?.message);

        uniqueTask();

        console.log(response?.data);
      })
      .catch(function (error) {
        // handle error
        setDeleteLoading(false);
        openSnackbar(error?.response?.data?.message);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <>
      {!loading && todoData?.length <= 0 && (
        <div className="text-2xl font-bold text-center flex justify-center items-center pl-16 pt-24">
          <h1>You don't have tasks yet. Kindly create a task </h1>
        </div>
      )}
      {loading && (
        <div className="text-2xl font-bold text-center px-56 pt-24">
          <h1>LOADING.....</h1>
        </div>
      )}


      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {todoData?.map((task) => (
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <a href={`/detail/${task.id}`}>
                  <img
                    alt="Placeholder"
                    className="block h-72 w-full"
                    src={task?.file}
                  />
                </a>

                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a
                      className="no-underline hover:underline text-black"
                      href={`/detail/${task.id}`}
                    >
                      {task.title}
                    </a>
                  </h1>
                  <p className="text-grey-darker text-sm">
                    {new Date(task?.created_at).toLocaleString()}
                  </p>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <a
                    className="flex items-center no-underline hover:underline text-black"
                    href={`/detail/${task.id}`}
                  >
                    <img
                      alt="Placeholder"
                      className="block rounded-full w-5 h-5"
                      src={task?.file}
                    />
                    <p className="ml-2 text-sm">
                      {author?.Name}
                    </p>
                  </a>
                  <div>
                    <button
                      onClick={() => deleteBtn(task)}
                      disabled={loading ? true : false}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {deleteLoading ? "Loading" : "Delete"}
                    </button>
                  </div>
                  <div className="">
                    <a href={`edit/${task.id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                    </a>
                  </div>
                </footer>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewTasks;
