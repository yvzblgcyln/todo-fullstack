import { AiOutlineHome } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "../redux/todosSlice";

function SideBar() {
  const todos = useSelector((state) => state.todos);
  const [menuClicked, setMenuClicked] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className="_sidebar df-col">
      <div className="trello-menu df-row" onClick={() => setMenuClicked(!menuClicked)}>
        <Link href="/">
          <div className="tab-cont  df-row">
            <AiOutlineHome />
            <div className="tab">Anasayfa</div>
          </div>
        </Link>
        {menuClicked ? <BiChevronDown /> : <BiChevronUp />}
      </div>
      <div className="submenu df-col" style={{ display: menuClicked ? "block" : "none" }}>
        {todos.map((todo, index) => (
          <div className="submenu-cont df-row" key={index}>
            <input
              type="checkbox"
              id={`todo${index}`}
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(index))}
            />
            <label
              htmlFor={`todo${index}`}
              className="sub-text"
              style={{ textDecoration: todo.completed && "line-through" }}
            >
              {todo.todo}
            </label>

            {/* <input type="checkbox" check={todo.completed} onChange={() => dispatch(toggleTodo(index))} />
            <div className="sub-text">{todo.todo}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
