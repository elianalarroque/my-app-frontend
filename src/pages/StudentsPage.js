import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function StudentsPage() {
  const { token, user } = useAuth();
  const [students, setStudents] = useState([]);

  useEffect(() => {
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

    if (user.type === "user" && user.teacher) {
      fetchStudents();
    }
  }, [token, user]);

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
