import React from "react";

function GasStationsList({ stations, userLocation }) {
  const calculateDistance = (station) => {
    if (!userLocation) return null;

    const toRadians = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = parseFloat(station.Latitud.replace(",", "."));
    const lon2 = parseFloat(station["Longitud (WGS84)"].replace(",", "."));
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  };

  return (
    <div className="mb-4">
      <h2>Resultados:</h2>
      {stations.length === 0 ? (
        <p>No se encontraron gasolineras con esos filtros.</p>
      ) : (
        <ul className="list-group">
          {stations.map((station, index) => (
            <li key={index} className="list-group-item">
              <strong>{station.Rótulo}</strong> - {station["Dirección"]} ({station["Municipio"]})
              <br />
              Gasolina 95: {station["Precio Gasolina 95 E5"]} € | Diésel: {station["Precio Gasóleo A"]} €
              {userLocation && (
                <div className="text-muted">Distancia: {calculateDistance(station)} km</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GasStationsList;
