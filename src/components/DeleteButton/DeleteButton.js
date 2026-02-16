export default function DeleteButton({ onDelete }) {
  return (
    <button onClick={onDelete} style={{ color: "red" }}>
      X
    </button>
  );
}
