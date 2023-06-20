import { AnimatePresence, motion } from 'framer-motion';
import React , {useEffect, useState}from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { Cookies } from 'react-cookie';

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

function AppContent() {
  // const cookies = new Cookies();

  // const user_id = cookies.get('user_id')

  // const [todoList, setToDoList] = useState([]);

  // const tasksUrl = 'http://localhost:8080/task/user/' + user_id

  // useEffect(() => {
  //    fetch(tasksUrl)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         //  console.log(data);
  //          setToDoList(data);
  //          window.localStorage.setItem('todoList', todoList);
  //       })
  //       .catch((err) => {
  //          console.log(err.message);
  //       });
  // }, []);
  const todoList = useSelector((state) => state.todo.todoList)
  console.log("todoList: ", todoList);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  console.log("sortedTodoList: ", sortedTodoList);


  const filterStatus = useSelector((state) => state.todo.filterStatus);
  console.log("filterStatus: ", filterStatus);


  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });


  const filterDates = useSelector((state) => state.todo.filterDates);
  console.log("filterDates: ", filterDates);

  const filteredTodoListByDate = filteredTodoList.filter((item) => {
    const time = new Date(item.time)
    return filterDates.startDate <= time && filterDates.endDate >= time;
  });

  console.log("filteredTodoListByDate: ", filteredTodoListByDate)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
    >
       <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <motion.p variants={child}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
