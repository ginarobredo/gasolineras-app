import React, { useState } from "react";

function Search({ onFilter, empresas, tiposCarburante }) {
  const [company, setCompany] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [distance, setDistance] = useState(10);
  const [lat, setLat] = useState("40.4168");
  const [lon, setLon] = useState("-3.7038");

  const handleSearch = () => {
    onFilter({
      company,
      fuelType,
      distance,
      userLocation: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      },
    });
  };

  return (
    <div className="mb-4">
      <div className="row g-3 mb-2">
        {/* Combo de empresas */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="">Todas las empresas</option>
            {empresas && empresas.length > 0 ? (
              empresas.map((empresa, index) => (
                <option key={index} value={empresa}>
                  {empresa}
                </option>
              ))
            ) : (
              <option disabled>Cargando empresas...</option>
            )}
          </select>
        </div>

        {/* Combo de tipos de carburante */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="">Todos los carburantes</option>
            {tiposCarburante && tiposCarburante.length > 0 ? (
              tiposCarburante.map((tipo, index) => (
                <option key={index} value={tipo.campo}>
                  {tipo.nombre}
                </option>
              ))
            ) : (
              <option disabled>Cargando tipos...</option>
            )}
          </select>
        </div>

        {/* Combo de distancia */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          >
            <option value={5}>Distancia: 5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
            <option value={500}>500 km</option>
          </select>
        </div>

        {/* Botón */}
        <div className="col-md-3 d-grid">
          <button className="btn btn-primary" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>

      {/* Entrada manual de latitud y longitud */}
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Latitud (ej. 40.4168)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Longitud (ej. -3.7038)"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
