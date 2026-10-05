function Dashboard({
  totalStudents,
  activeStudents,
  occupiedSeats,
  availableSeats,
  totalSeats,
}) {
  const stats = [
    { label: "Total Students", value: totalStudents },
    { label: "Active Students", value: activeStudents },
    { label: "Occupied Seats", value: occupiedSeats },
    { label: "Available Seats", value: availableSeats },
  ];

  return (
    <>
      <header>
        <h1>Dashboard</h1>
        <p>Overview of students and seat allocation</p>
      </header>

      <section className="stats">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="dashboard-info">
        <div>
          <span>Seat capacity</span>
          <strong>{totalSeats} seats</strong>
        </div>

        <div>
          <span>Occupancy</span>
          <strong>
            {totalSeats === 0
              ? 0
              : Math.round((occupiedSeats / totalSeats) * 100)}
            %
          </strong>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
