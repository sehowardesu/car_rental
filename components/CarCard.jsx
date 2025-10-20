import React from "react";

function CarCard({ car, onRent, disabled }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={car.image_url}
        className="card-img-top"
        alt={`${car.car_name} ${car.model}`}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="card-title">
          {car.car_name} {car.model}
        </h5>
        <p className="card-text">Year: {car.year}</p>
        <p className="card-text">Price per day: Php {car.price}</p>
        <p className="card-text">Plate Number: {car.plate_number}</p>
        <p className="card-text">
          Status: {car.availability === 0 ? "Available" : "Not Available"}
        </p>


        <button
          className="btn btn-primary w-100"
          onClick={() => onRent(car.car_id)}
          disabled={car.availability !== 0}
        >
          {car.availability === 0 ? "Rent Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default CarCard;
