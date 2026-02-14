import TeacherData from "../components/TeacherData/TeacherData";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  console.log(user);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Profile</h1>

      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Type</th>
            <th>Active</th>
          </tr>
          <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.type}</td>
            <td>{user.active ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
      {user.teacher && <TeacherData />}
    </div>
  );
}
