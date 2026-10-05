function StudentForm({
  student,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="student-form">
      <input
        name="name"
        type="text"
        placeholder="Student Name"
        value={student.name}
        onChange={onChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={student.email}
        onChange={onChange}
      />

      <input
        name="seat"
        type="number"
        min="1"
        max="50"
        placeholder="Seat Number"
        value={student.seat}
        onChange={onChange}
      />

      <div className="form-actions">
        <button
          className="primary-button"
          onClick={onSubmit}
        >
          {isEditing ? "Update Student" : "Add Student"}
        </button>

        {isEditing && (
          <button
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default StudentForm;
