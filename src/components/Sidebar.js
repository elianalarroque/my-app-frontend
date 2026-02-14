import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div id="sidebar">
      <h1>My App</h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>

          {user?.type === "admin" && (
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          )}

          {user?.type === "user" && (
            <li>
              <NavLink to="/students">Students</NavLink>
            </li>
          )}

          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
