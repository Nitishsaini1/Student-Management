function Sidebar({ activePage, onPageChange }) {
  const pages = [
    { id: "dashboard", label: "Dashboard" },
    { id: "students", label: "Students" },
    { id: "seats", label: "Seats" },
  ];

  return (
    <aside className="sidebar">
      <h2>Student Management</h2>

      <nav>
        {pages.map((page) => (
          <button
            key={page.id}
            className={activePage === page.id ? "active" : ""}
            onClick={() => onPageChange(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
