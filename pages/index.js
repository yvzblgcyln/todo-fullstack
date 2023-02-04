import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, fetchData, removeTodo, setTodos, toggleTodo } from "../redux/todosSlice";
import { setIndex, setModal } from "../redux/modalSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import TodoModal from "@/components/TodoModal";

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleModal = (index, id) => {
    dispatch(setModal());
    dispatch(setIndex({ index, id }));
  };

  useEffect(() => {
    //dispatch(fetchData());
    console.log(todos);
    fetch("http://localhost:5000/get")
      .then((res) => res.json())
      .then((data) => dispatch(setTodos(data)));
  }, []);

  const handleToggle = (index, id) => {
    dispatch(toggleTodo(index));
    fetch(`http://localhost:5000/complete/${id}`);
  };

  const handleRemove = (index, id) => {
    dispatch(removeTodo(index));
    fetch(`http://localhost:5000/delete/${id}`);
  };

  const handleAdd = (text) => {
    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        todo: text,
      }),
    })
      .then(() => fetch("http://localhost:5000/get"))
      .then((res) => res.json())
      .then((data) => dispatch(addTodo(data[data.length - 1])));
  };

  return (
    <div className="app df-row ">
      {todos &&
        todos.map((item, index) => (
          <div className="todo df-col" key={index} style={{ background: item.completed && "green" }}>
            <div className="text" onClick={() => handleModal(index, item.id)}>
              {item.todo}
            </div>
            <div className="buttons df-row">
              <TiTick onClick={() => handleToggle(index, item.id)} />
              <AiOutlineDelete onClick={() => handleRemove(index, item.id)} />
            </div>
          </div>
        ))}
      <div className="todo add" onClick={() => handleAdd(`todo${todos.length + 1}`)}>
        +
      </div>
      {modal.modal && <TodoModal />}
    </div>
  );
}
