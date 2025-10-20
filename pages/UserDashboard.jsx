import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import Navbar from "../components/Navbar";
import "./UserDashboard.css";
import logo from "../assets/logo.png"; // ✅ Import logo correctly

function UserDashboard({ onLogout, userId, fullname, onNavigate }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost/car_rental/backend/fetch_cars.php");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Rent a car
  const handleRent = async (carId) => {
    try {
      const selectedCar = cars.find((car) => car.car_id === carId);

      if (!selectedCar) {
        alert("Car not found.");
        return;
      }

      if (selectedCar.availability !== 0) {
        alert("Car is not available.");
        return;
      }

      const response = await fetch("http://localhost/car_rental/backend/rent_car.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, car_id: selectedCar.car_id }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Car Rented!");
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.car_id === selectedCar.car_id ? { ...car, availability: 1 } : car
          )
        );
      } else {
        alert(data.message || "Failed to rent car.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="user-dashboard-container">
      {/* Navbar with proper props */}
      <Navbar
        role="user"
        onLogout={onLogout}
        onNavigate={onNavigate}
        userId={userId}
        fullname={fullname}
      />

      {/* Dashboard Header */}
      <div className="dashboard-header text-center my-4">
        <img src={logo} alt="Logo" className="dashboard-logo" />
        <h2 className="mt-3">Welcome, {fullname || "User"}!</h2>
      </div>

      {/* Loading & Error Handling */}
      {loading && <p>Loading cars...</p>}
      {error && <p style={{ color: "red" }}>Error loading cars: {error}</p>}

      {/* Car List */}
      {!loading && !error && (
        <div className="car-list" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {cars.length > 0 ? (
            cars.map((car) => (
              <CarCard
                key={car.car_id}
                car={car}
                onRent={handleRent}
                disabled={car.availability !== 0}
              />
            ))
          ) : (
            <p>No cars available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
