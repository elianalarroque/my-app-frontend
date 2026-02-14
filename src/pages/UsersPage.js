import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function UsersPage() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (user.type === "admin") {
      fetchUsers();
    }
  }, [token, user]);

  if (user.type !== "admin") {
    return alert("You are not authorized to view this page");
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
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.type}</td>
              <td>{u.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
