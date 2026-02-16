import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DeleteButton from "../components/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      // debugger;
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    /* si no esta logueado, sale de la funcion */
    if (!user) return;
    /* si quiere entrar forzadamente y no es admin lo mando a login y si esta logueado se ira a profile */
    if (user.type !== "admin") {
      alert("You are not authorized to view this page");
      navigate("/login");
    }
    /* si todo bien entonces hago el fetch */
    fetchUsers();
  }, [user, navigate, fetchUsers]);

  /* funcion para borrar */
  async function handleDelete(userId) {
    try {
      const userToDelete = users.find((user) => user.id === userId);
      console.log("Deleting teacher:", userToDelete.teacher.id);
      console.log(userToDelete);
      if (userToDelete.teacher) {
        // verificar si tiene students
        const resStudents = await fetch(
          `/api/teachers/${userToDelete.teacher.id}/students`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const students = await resStudents.json();
        if (students.length > 0) {
          alert("Cannot delete user: their teacher has students.");
          return;
        }
        /* si el teacher no tiene alumnos, se borra primero el teacher y luego el usuario, sino, no esta autorizado */
        const deleteTeacher = await fetch(
          `/api/teachers/${userToDelete.teacher.id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!deleteTeacher.ok) {
          throw new Error("This teacher cannot be deleted");
        }
      }
      /* si se puede borrar el teacher, entonces, borro el usuario */
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");

      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    }
  }

  return (
    <div className="container">
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Type</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.type}</td>
              <td>{u.active ? "Yes" : "No"}</td>
              <td>
                {" "}
                <DeleteButton onDelete={() => handleDelete(u.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
