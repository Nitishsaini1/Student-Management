function StudentCard({
  student,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const isActive = student.status === "Active";

  return (
    <article className="student-card">
      <div className="student-card-header">
        <div>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
        </div>

        <span
          className={`status-badge ${
            isActive ? "active" : "inactive"
          }`}
        >
          {student.status}
        </span>
      </div>

      <div className="student-meta">
        <span>Seat {student.seat}</span>
      </div>

      <div className="card-actions">
        <button
          className="secondary-button"
          onClick={() => onToggleStatus(student.id)}
        >
          {isActive ? "Set Inactive" : "Set Active"}
        </button>

        <button
          className="edit-button"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          className="danger-button"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default StudentCard;
