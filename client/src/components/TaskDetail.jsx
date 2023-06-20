import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskDetail = () => {
  const navigate = useNavigate();
  const [singleTask, setSingleTask] = useState();
  const [userId, setUserID] = useState();
  const [author, setAuthor] = useState();
  const { id } = useParams();
  useEffect(() => {
    const User = localStorage.getItem("user");
    console.log("User: " + User)

    if (!User) {
      navigate("/login");
    }
  }, []);

 const getTaskUrl = process.env.REACT_APP_BACKEND_URL + "/task/" + id;

 const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Credentials': 'true',
};

  const getSingleTask = () => {
    axios
      .get(
        getTaskUrl,
        //{},
        {
          headers
        }
      )
      .then(function (response) {
        setSingleTask(response?.data);
        setUserID(response?.data?.user_id)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };



  const getUser = () => {
    console.log(singleTask)
    const getUserUrl = process.env.REACT_APP_BACKEND_URL + "/user/" + userId;
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
    getSingleTask();
    getUser();
  }, []);

  return (
    <div className="bg-gray-700 bg-cover bg-center text-white">
      <div className="max-w-3xl mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
        <div className="max-w-3xl mx-auto text-xl sm:text-4xl font-semibold inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
          {singleTask?.title}
        </div>

        <img className="w-full h-96 my-4" src={singleTask?.file} />
           <hr />
      </div>

      <div className="max-w-3xl mx-auto ">
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div className="bg-yellow-700 text-white">
              <p className="text-base leading-8 my-5">
                Author: {author?.Name}
              </p>
              <p className="text-base leading-8 my-5">
                Description : {singleTask?.description}
              </p>
              <p className="text-base leading-8 my-5">
                  Status: {singleTask?.status}
              </p>
            <p className="text-grey-darker text-sm">
                    Created At : {new Date(singleTask?.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
