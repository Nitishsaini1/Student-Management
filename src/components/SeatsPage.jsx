function SeatsPage({
  students,
  totalSeats,
  occupiedSeats,
  availableSeats,
  seatFilter,
  selectedSeat,
  onFilterChange,
  onSeatSelect,
  onCloseDetails,
}) {
  const seats = Array.from(
    { length: totalSeats },
    (_, index) => index + 1
  );

  const filteredSeats = seats.filter((seatNumber) => {
    const student = students.find(
      (student) => student.seat === String(seatNumber)
    );

    const isOccupied = Boolean(student);

    if (seatFilter === "occupied") {
      return isOccupied;
    }

    if (seatFilter === "available") {
      return !isOccupied;
    }

    return true;
  });

  return (
    <>
      <header>
        <h1>Seats</h1>
        <p>View and manage seat availability</p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <h3>Total Seats</h3>
          <p>{totalSeats}</p>
        </div>

        <div className="stat-card">
          <h3>Occupied Seats</h3>
          <p>{occupiedSeats}</p>
        </div>

        <div className="stat-card">
          <h3>Available Seats</h3>
          <p>{availableSeats}</p>
        </div>
      </section>

      <section className="seats-section">
        <div className="seat-toolbar">
          <div>
            <h2>Seat Map</h2>
            <p>Click an occupied seat to view student details.</p>
          </div>

          <div className="seat-filters">
            {["all", "available", "occupied"].map((filter) => (
              <button
                key={filter}
                className={
                  seatFilter === filter ? "filter-active" : ""
                }
                onClick={() => onFilterChange(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="seat-grid">
          {filteredSeats.map((seatNumber) => {
            const student = students.find(
              (student) =>
                student.seat === String(seatNumber)
            );

            const isOccupied = Boolean(student);

            return (
              <button
                type="button"
                key={seatNumber}
                className={`seat-card ${
                  isOccupied ? "occupied" : "available"
                }`}
                onClick={() => {
                  if (student) {
                    onSeatSelect(student);
                  }
                }}
                disabled={!student}
              >
                <span className="seat-number">
                  {seatNumber}
                </span>

                <span className="seat-status">
                  {isOccupied ? "Occupied" : "Available"}
                </span>

                {student && (
                  <small>{student.name}</small>
                )}
              </button>
            );
          })}
        </div>

        {selectedSeat && (
          <div className="selected-seat">
            <div className="selected-seat-header">
              <div>
                <span className="detail-label">Selected Seat</span>
                <h2>Seat {selectedSeat.seat}</h2>
              </div>

              <span
                className={`status-badge ${
                  selectedSeat.status === "Active"
                    ? "active"
                    : "inactive"
                }`}
              >
                {selectedSeat.status}
              </span>
            </div>

            <div className="student-details-grid">
              <div>
                <span>Name</span>
                <strong>{selectedSeat.name}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{selectedSeat.email}</strong>
              </div>
            </div>

            <button
              className="secondary-button"
              onClick={onCloseDetails}
            >
              Close
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default SeatsPage;
