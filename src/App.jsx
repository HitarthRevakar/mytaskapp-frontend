/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { MdDelete} from "react-icons/md";
// import { AiFillDelete } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";
import EditIcon from '../src/assets/edit-icon.png'
import DeleteIcon from '../src/assets/delete-icon.png'
import CmfDeleteIcon from '../src/assets/confirm-delete-icon.png'
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ------------- api call ------------- //
const API =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PRO;


  
  const colors = [
    { bg: "#F2FDFF", line: "#208597" },
    { bg: "#F4F1FF", line: "#7965C0" },
  ];
function gettasks(){
  axios.get(`${API}/`)
      .then((res) => setTasks(()=>res.data))
      .catch((err) => console.error("Fetch error:", err));
}
  // READ - Get all todos
  useEffect(() => {
    gettasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CREATE or UPDATE task
  const handleSubmit = () => {
    if (!task.trim()) return;

    if (isEditing) {
      axios.put(`${API}/${editId}`, { title: task })
        .then((res) => {
          const updated = tasks.map((t) =>
            t.id === editId ? res.data[0] : t
          );
          setTasks(updated);
          resetForm();
          gettasks()
        });
    } else {
      axios.post(`${API}/`, { title: task })
        .then((res) => {
          setTasks([...tasks, res.data[0]]);
          resetForm();
          gettasks()
        });
    }
  };

  const resetForm = () => {
    setTask("");
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (id, currentTitle) => {
    setTask(currentTitle);
    setIsEditing(true);
    setEditId(id);
    setShowModal(true);
  };

  // DELETE task
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`${API}/${deleteId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== deleteId));
        setDeleteId(null);
        setShowDeleteModal(false);
        gettasks()
      });
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Header />
      <div className="layout">
        <div className="create-button">
          <button className="create-btn" onClick={() => setShowModal(true)}>
            <IoAdd className="add-icon" />
            <span>Create Task</span>
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{isEditing ? "Edit List" : "Create List"}</h2>
              <p>
                To Do List <span className="red-mark">*</span>
              </p>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Details..."
                maxLength={255}
              ></textarea>
              <div className="modal-buttons">
                <button onClick={handleSubmit}>
                  {isEditing ? "Update" : "Submit"}
                </button>
                <button onClick={resetForm}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="no-task-msg">
            <p>No tasks found. Start by creating one!</p>
          </div>
        )}

        <div className="task-cards">
          {tasks.map((item, index) => (
            item && item.title && (
              <div
                key={item.id}
                className="task-card"
                style={{
                  backgroundColor: colors[index % colors.length].bg,
                  "--line-color": colors[index % colors.length].line,
                }}
              >
                <p className="task-text">{item.title}</p>
                <div className="action-buttons">
                  <button className="edit" onClick={() => handleEdit(item.id, item.title)}>
                    <img src={EditIcon} /> 
                  </button>
                  <button className="delete" onClick={() => handleDelete(item.id)}>
                    <img src={DeleteIcon} /> 
                  
                  </button>
                </div>
              </div>
              )
          ))}
        </div>

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal delete-modal">
              <span className="delete-icon"><img src={CmfDeleteIcon} /></span>
              <h3 className="confirm-text">
                <center>Are you sure you want to delete selected contacts?</center>
              </h3>
              <div className="modal-buttons delete-btn-modal">
                <button onClick={confirmDelete} className="delete">Delete</button>
                <button onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
