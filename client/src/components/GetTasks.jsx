import React, { useState, useEffect } from "react";
import axios from "axios";
import DateRangePickerComp from "./DateRangePicker";
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus, updateFilterDates} from '../slices/todoSlice';
import { AnimatePresence, motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const GetTasks = () => {
  const [todoData, setTodoData] = useState();
  const [loading, setLoading] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const initialFilterDates = useSelector((state) => state.todo.filterDates);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useDispatch();

  const allTasks = () => {
    const getAllTasksUrl = process.env.REACT_APP_BACKEND_URL + "/tasks"
    const headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Credentials': 'true',
    };

    setLoading(true);

    axios
      .get(
        getAllTasksUrl,
        {},
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        setTodoData(response?.data);
        localStorage.setItem("todoList", JSON.stringify(response?.data));
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const updateFilterByDates = (range) => {
    if (range.startDate !== initialFilterDates.startDate || range.endDate !== initialFilterDates.endDate){
      dispatch(updateFilterDates(range));
    }
  };

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  useEffect(() => {
    allTasks();
  }, []);

  console.log(todoData)

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
        // openSnackbar(response?.data?.message);

        // uniqueTask();

        console.log(response?.data);
      })
      .catch(function (error) {
        // handle error
        setDeleteLoading(false);
        // openSnackbar(error?.response?.data?.message);
      })
      .then(function () {
        // always executed
      });
  };


  return (
    <>
      {loading && (
        <div className="text-2xl font-bold text-center px-56 pt-24">
          <h1>LOADING.....</h1>
        </div>
      )}

      <div className="relative container w-full my-6 mx-auto px-2 md:px-6 bg-yellow-700 bg-cover bg-center">
        <div className="flex flex-wrap -mx-2 lg:mx-2 w-full px-2 py-4">
          <div className="text-2xl font-bold text-center items-center px-2 pt-2 py-4" >
                <DateRangePickerComp value={initialFilterDates} onChange={updateFilterByDates}/>
          </div>
          <div className="text-2xl font-bold text-center items-center px-40 pt-2 py-4">
            <select
              id="status"
              onChange={(e) => updateFilter(e)}
              value={filterStatus}
            >
              <option value="all">All</option>
              <option value="todo">ToDo</option>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 lg:-mx-2 w-full px-2">
          {todoData?.map((data) => (
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 bg-teal-500 text-white">

              <article className="overflow-hidden rounded-lg shadow-lg">
                <a href={`/detail/${data.id}`}>
                  <img
                    alt="Placeholder"
                    className="block h-72 w-full"
                    src={data?.file}
                  />
                </a>

                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a
                      className="no-underline hover:underline "
                      href={`/detail/${data.id}`}
                    >
                      {data.title}
                    </a>
                  </h1>
                  <p className="text-grey-darker text-sm">
                    {new Date(data?.created_at).toLocaleString()}
                  </p>
                  <p className="ml-2 text-sm">
                      {data?.status}
                    </p>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4 bg-grey-700 ">
                  <a
                    className="flex items-center no-underline hover:underline text-black"
                    href={`/detail/${data.id}`}
                  >
                    <img
                      alt="Placeholder"
                      className="block rounded-full w-5 h-5"
                      src={data?.image}
                    />
                  </a>
                  <a
                    className="no-underline text-grey-darker hover:text-red-dark"
                    href="#"
                  >
                    <span className="hidden">Like</span>
                    <i className="fa fa-heart"></i>
                  </a>

                  <div>
                    <button
                      onClick={() => deleteBtn(data)}
                      disabled={loading ? true : false}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {deleteLoading ? "Loading" : "Delete"}
                    </button>
                  </div>
                  <div className="">
                    <a href={`edit/${data.id}`}>
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

export default GetTasks;
