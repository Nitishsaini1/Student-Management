import StudentForm from "./StudentForm";
import StudentCard from "./StudentCard";

function StudentsPage({
  students,
  totalStudents,
  newStudent,
  editingStudentId,
  searchTerm,
  onInputChange,
  onSearchChange,
  onSubmit,
  onCancelEdit,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <>
      <header>
        <h1>Students</h1>
        <p>Add, search, edit and manage students</p>
      </header>

      <section className="students-section">
        <div className="section-header">
          <div>
            <h2>
              {editingStudentId !== null
                ? "Edit Student"
                : "Add Student"}
            </h2>
            <p>
              {editingStudentId !== null
                ? "Update the student's information."
                : "Add a new student to the system."}
            </p>
          </div>
        </div>

        <StudentForm
          student={newStudent}
          isEditing={editingStudentId !== null}
          onChange={onInputChange}
          onSubmit={onSubmit}
          onCancel={onCancelEdit}
        />

        <div className="list-header">
          <div>
            <h2>Student List</h2>
            <span>{totalStudents} total students</span>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />
        </div>

        <div className="student-list">
          {students.length === 0 ? (
            <div className="empty-state">
              <h3>No students found</h3>
              <p>Try a different search term.</p>
            </div>
          ) : (
            students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default StudentsPage;
