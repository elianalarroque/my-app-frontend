import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function TeacherData({ teacher }) {
  const { user } = useAuth();

  if (!user.teacher) return null;

  return (
    <div id="container">
      <h3>Teacher info:</h3>

      <p>
        <strong>Full name:</strong> {user.teacher.name} {user.teacher.last_name}
      </p>
      <p>
        <strong>DNI:</strong> {user.teacher.dni}
      </p>
      <p>
        <strong>Teacher ID:</strong> {user.teacher.id}
      </p>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {new Date(user.teacher.date_of_birth).toLocaleDateString()}
      </p>
    </div>
  );
}
