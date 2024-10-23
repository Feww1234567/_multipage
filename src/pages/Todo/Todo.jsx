import "./Todo.css";
import { useEffect, useState, useRef } from "react";
import { fetchTodos } from "../../data/todos";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Todo() {
  // State variables
  const [todosRaw, setTodosRaw] = useState([]); // All todos
  const [todos, setTodos] = useState([]); // Filtered todos
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items to display per page
  const [OnlyWaiting, setOnlyWaiting] = useState(false); // Filter to show only waiting todos
  const [Numpage, setNumpage] = useState(0); // Total number of pages
  const [CurrentPage, setCurrentPage] = useState(1); // Current page number

  // Fetch todos on component mount
  useEffect(() => {
    const todos = fetchTodos();
    setTodosRaw(todos);
    setCurrentPage(1);
  }, []); // Load data on first render

  // Update filtered todos and number of pages when todosRaw, OnlyWaiting, or itemsPerPage changes
  useEffect(() => {
    const filteredTodos = OnlyWaiting
      ? todosRaw.filter((todo) => !todo.completed) // Filter only waiting todos
      : todosRaw; // Show all todos
    setTodos(filteredTodos);
    setNumpage(Math.ceil(filteredTodos.length / itemsPerPage)); // Calculate number of pages
  }, [todosRaw, OnlyWaiting, itemsPerPage]);

  // Ensure current page is within the valid range when number of pages changes
  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, Numpage > 0 ? Numpage : 1));
  }, [Numpage]);

  // Page change
  const PageChanger = (newPage) => {
    if (newPage >= 1 && newPage <= Numpage) {
      setCurrentPage(newPage);
    }
  };

  // Delete todo by id
  const DeleteClick = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  // Change status of todo by id
  const ChangeStatus = (id) => {
    const updatedTodos = todosRaw.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodosRaw(updatedTodos);
  };

  // Modal
  const [show, setShow] = useState(false);
  const newIdRef = useRef();
  const newTitleRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addClick = (id, title) => {
    setTodosRaw([
      ...todosRaw,
      {
        userId: 1,
        id: id,
        title: title,
        completed: false,
      },
    ]);
  };

  return (
    <div className="Todo-container">
      {/* Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-plus-circle-fill">&nbsp;Add ToDo</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  Number(
                    todosRaw.reduce((prev, todo) => {
                      return todo.id > prev ? todo.id : prev;
                    }, 0)
                  ) + 1
                }
                ref={newIdRef}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control as="textarea" rows={3} ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="Modal-footer">
          <Button
            variant="secondary"
            className="btn-Modal"
            onClick={handleClose}
          >
            <i className="bi bi-x-circle">&nbsp;Cancel</i>
          </Button>
          <Button
            variant="primary"
            className="btn-Modal"
            onClick={() => {
              const id = Number(newIdRef.current.value);
              const title = newTitleRef.current.value.trim();
              if (title === "") {
                alert("Title cannot be empty");
                newTitleRef.current.focus();
              } else {
                addClick(id, title);
                handleClose();
              }
            }}
          >
            <i className="bi bi-plus-circle-fill">&nbsp;Add</i>
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal */}
      {/* Filter */}
      <div className="filter-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onChange={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            show only waiting
          </label>
        </div>
        {/* Page Controller */}
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>
      {/* Table */}
      <div className="table-container">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th
                style={{
                  alignContent: "center",
                  textAlign: "center",
                  width: "3rem",
                }}
              >
                ID
              </th>
              <th style={{ alignContent: "center" }}>Title</th>
              <th style={{ textAlign: "right" }}>
                Completed&nbsp;
                <button
                  className="btn btn-primary btn-add"
                  onClick={() => setShow(true)}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              // Filter items per page
              todos
                .filter((todo, index) => {
                  const min = (CurrentPage - 1) * itemsPerPage;
                  const max = CurrentPage * itemsPerPage - 1;
                  return index >= min && index <= max;
                })
                .map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <td style={{ textAlign: "left" }}>
                        <span
                          className="badge bg-secondary"
                          style={{ width: "3rem" }}
                        >
                          {todo.id}
                        </span>
                      </td>
                      <td className="text-left">{todo.title}</td>
                      <td style={{ textAlign: "right" }}>
                        <i
                          className={
                            "badge bg-" +
                            (todo.completed ? "success" : "warning")
                          }
                        >
                          {todo.completed ? (
                            <i className="btn btn-success">
                              Done<b className="bi bi-check"></b>
                            </i>
                          ) : (
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                ChangeStatus(todo.id);
                              }}
                            >
                              waiting<b className="bi bi-clock"></b>
                            </button>
                          )}
                        </i>
                        <button
                          onClick={() => {
                            DeleteClick(todo.id);
                          }}
                          className="btn btn-danger"
                        >
                          <span
                            className="bi bi-trash"
                            style={{ fontSize: "20px" }}
                          ></span>
                        </button>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="pagination-container">
                <div className="pagination">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => PageChanger(1)}
                    disabled={CurrentPage === 1}
                  >
                    First
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => PageChanger(CurrentPage - 1)}
                    disabled={CurrentPage === 1}
                  >
                    Previous
                  </button>
                  {CurrentPage}/{Numpage}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => PageChanger(CurrentPage + 1)}
                    disabled={CurrentPage === Numpage}
                  >
                    Next
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => PageChanger(Numpage)}
                    disabled={CurrentPage === Numpage}
                  >
                    Last
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Todo;
