import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import StudentsPage from "./components/StudentsPage";
import SeatsPage from "./components/SeatsPage";

 

const TOTAL_SEATS = 50;

function App() {
  // =========================
  // STATE
  // =========================

  const [studentList, setStudentList] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    try {
      return savedStudents ? JSON.parse(savedStudents) : initialStudents;
    } catch {
      return [];
    }
  });

  const [activePage, setActivePage] = useState("dashboard");

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    seat: "",
  });

  const [editingStudentId, setEditingStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [seatFilter, setSeatFilter] = useState("all");
  const [selectedSeat, setSelectedSeat] = useState(null);

  // =========================
  // PERSIST DATA
  // =========================

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(studentList));
  }, [studentList]);

  // =========================
  // STUDENT FORM
  // =========================

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewStudent((currentStudent) => ({
      ...currentStudent,
      [name]: value,
    }));
  }

  function resetStudentForm() {
    setNewStudent({
      name: "",
      email: "",
      seat: "",
    });

    setEditingStudentId(null);
  }

  function validateStudent() {
    const name = newStudent.name.trim();
    const email = newStudent.email.trim();
    const seat = newStudent.seat.trim();

    if (!name || !email || !seat) {
      alert("Please fill all fields.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    const seatNumber = Number(seat);

    if (!Number.isInteger(seatNumber)) {
      alert("Seat number must be a whole number.");
      return false;
    }

    if (seatNumber < 1 || seatNumber > TOTAL_SEATS) {
      alert(`Seat number must be between 1 and ${TOTAL_SEATS}.`);
      return false;
    }

    const emailExists = studentList.some(
      (student) =>
        student.email.trim().toLowerCase() === email.toLowerCase() &&
        student.id !== editingStudentId
    );

    if (emailExists) {
      alert("This email is already registered.");
      return false;
    }

    const seatExists = studentList.some(
      (student) =>
        student.seat.trim() === seat &&
        student.id !== editingStudentId
    );

    if (seatExists) {
      alert("This seat is already occupied.");
      return false;
    }

    return true;
  }

  function handleSubmitStudent() {
    if (!validateStudent()) {
      return;
    }

    const studentData = {
      name: newStudent.name.trim(),
      email: newStudent.email.trim(),
      seat: newStudent.seat.trim(),
    };

    if (editingStudentId !== null) {
      setStudentList((currentStudents) =>
        currentStudents.map((student) =>
          student.id === editingStudentId
            ? { ...student, ...studentData }
            : student
        )
      );
    } else {
      const newStudentRecord = {
        id: Date.now(),
        ...studentData,
        status: "Active",
      };

      setStudentList((currentStudents) => [
        ...currentStudents,
        newStudentRecord,
      ]);
    }

    resetStudentForm();
  }

  function handleEditStudent(student) {
    setNewStudent({
      name: student.name,
      email: student.email,
      seat: student.seat,
    });

    setEditingStudentId(student.id);
    setActivePage("students");
  }

  function handleDeleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    setStudentList((currentStudents) =>
      currentStudents.filter((student) => student.id !== id)
    );

    if (selectedSeat?.id === id) {
      setSelectedSeat(null);
    }

    if (editingStudentId === id) {
      resetStudentForm();
    }
  }

  function handleToggleStatus(id) {
    setStudentList((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              status:
                student.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : student
      )
    );

    if (selectedSeat?.id === id) {
      setSelectedSeat((currentStudent) => ({
        ...currentStudent,
        status:
          currentStudent.status === "Active"
            ? "Inactive"
            : "Active",
      }));
    }
  }

  // =========================
  // DERIVED DATA
  // =========================

  const search = searchTerm.trim().toLowerCase();

  const filteredStudents = studentList.filter((student) => {
    return (
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search)
    );
  });

  const totalStudents = studentList.length;

  const activeStudents = studentList.filter(
    (student) => student.status === "Active"
  ).length;

  const occupiedSeats = studentList.length;
  const availableSeats = TOTAL_SEATS - occupiedSeats;

  // =========================
  // PAGE
  // =========================

  function renderPage() {
    if (activePage === "students") {
      return (
        <StudentsPage
          students={filteredStudents}
          totalStudents={totalStudents}
          newStudent={newStudent}
          editingStudentId={editingStudentId}
          searchTerm={searchTerm}
          onInputChange={handleInputChange}
          onSearchChange={setSearchTerm}
          onSubmit={handleSubmitStudent}
          onCancelEdit={resetStudentForm}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          onToggleStatus={handleToggleStatus}
        />
      );
    }

    if (activePage === "seats") {
      return (
        <SeatsPage
          students={studentList}
          totalSeats={TOTAL_SEATS}
          occupiedSeats={occupiedSeats}
          availableSeats={availableSeats}
          seatFilter={seatFilter}
          selectedSeat={selectedSeat}
          onFilterChange={setSeatFilter}
          onSeatSelect={setSelectedSeat}
          onCloseDetails={() => setSelectedSeat(null)}
        />
      );
    }

    return (
      <Dashboard
        totalStudents={totalStudents}
        activeStudents={activeStudents}
        occupiedSeats={occupiedSeats}
        availableSeats={availableSeats}
        totalSeats={TOTAL_SEATS}
      />
    );
  }

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
