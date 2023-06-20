import React, { useEffect, useState } from "react";
import "./Home.css";
import GetTasks from "./GetTasks";

const Home = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const User = localStorage.getItem("user");
    console.log(User)
    const parseUser = JSON.parse(User);
    setUserData(parseUser);
  }, []);

  return (
    <>
      <div className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-75"></div>

        <main className="px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h2 className="text-4xl tracking-tight leading-10 font-medium sm:text-5xl text-white sm:leading-none md:text-6xl">
              <span className="text-indigo-600 font-bold">
                Hi {userData?.Name},
              </span>{" "}
              Welcome to my site!
            </h2>
            <p className="mt-3 text-white sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5">
              This app will help you to manage your tasks . You can add new tasks, edit the tasks ,
               delete the tasks and  view tasks via this application.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex justify-center">
              <div className="rounded-md shadow">
                <a
                  href="/create"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:px-10"
                >
                  Create New Task
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="/view"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:px-10"
                >
                  View My Tasks
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      <GetTasks />
    </>
  );
};

export default Home;
