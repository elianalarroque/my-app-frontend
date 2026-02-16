import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DeleteButton from "../components/DeleteButton/DeleteButton";

export default function StudentsPage() {
  const { token, user } = useAuth();
  const [students, setStudents] = useState([]);

  async function fetchStudents() {
    try {
      const teacherId = user.teacher.id;

      const res = await fetch(`/api/teachers/${teacherId}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (user.type === "user" && user.teacher) {
      fetchStudents();
    }
  }, [token, user]);

  /* funcion para eliminar */
  async function handleDelete(studentId) {
    try {
      const res = await fetch(
        `/api/students/${studentId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Failed to delete student");

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error deleting student");
    }
  }

  return (
    <div className="container">
      <h1>Students</h1>
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.last_name}</td>
                <td>{student.dni}</td>
                <td>
                  {" "}
                  <DeleteButton
                    onDelete={() => handleDelete(student.id)}
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students assigned.</p>
      )}
    </div>
  );
}
