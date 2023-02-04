import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { setIndex, setModal } from "../redux/modalSlice";
import { addTodo, removeTodo, toggleTodo, update } from "../redux/todosSlice";

function TodoModal(args) {
  const { modal } = useSelector((state) => state);
  const { todos } = useSelector((state) => state);
  const [index, setIndex] = useState(modal.selectedIndex);
  const [id, setId] = useState(modal.selectedId);

  const [input, setInput] = useState(todos[modal.selectedIndex].todo);
  const dispatch = useDispatch();

  const toggle = () => dispatch(setModal());

  const handleUpdate = () => {
    dispatch(update({ index, input }));
    dispatch(setModal());
    fetch(`http://localhost:5000/update/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        todo: input,
        completed: todos[modal.selectedIndex].completed,
      }),
    });
  };

  const handleDelete = () => {
    dispatch(removeTodo(index));
    dispatch(setModal());
    fetch(`http://localhost:5000/delete/${id}`);
  };

  const handleComplete = () => {
    dispatch(toggleTodo(index));
    dispatch(setModal());
    fetch(`http://localhost:5000/complete/${id}`);
  };

  return (
    <div>
      <Modal isOpen={modal.modal} toggle={toggle} {...args}>
        <ModalHeader style={{ background: todos[modal.selectedIndex].completed && "green" }}>
          <div>To do</div>
        </ModalHeader>
        <ModalBody>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color="success" onClick={handleComplete}>
            Completed
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TodoModal;
