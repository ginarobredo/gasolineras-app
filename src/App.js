import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import GasStationsList from "./components/GasStationsList";
import Map from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [gasStations, setGasStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [tiposCarburante, setTiposCarburante] = useState([]);

  useEffect(() => {
    fetch("https://geoportalgasolineras.es/resources/files/preciosEESS_es.json")
      .then((res) => res.json())
      .then((data) => {
        const lista = data.ListaEESSPrecio;
        setGasStations(lista);
        setFilteredStations(lista);

        const empresasUnicas = [...new Set(lista.map(e => e["Rótulo"]))].sort();
        setEmpresas(empresasUnicas);

        const muestra = lista[0];
        const tipos = Object.keys(muestra)
          .filter(k => k.toLowerCase().includes("precio"))
          .map(k => ({
            campo: k,
            nombre: k.replace("Precio ", "").replace(" E5", "").replace(" A", "").replace(" B", "")
          }));

        setTiposCarburante(tipos);
      })
      .catch((err) => console.error("Error al obtener datos:", err));
  }, []);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleFilter = ({ company, fuelType, distance, userLocation }) => {
    setUserLocation(userLocation);

    const filtered = gasStations.filter((station) => {
      const matchesCompany =
        company === "" || station.Rótulo === company;

      const matchesFuel =
        fuelType === "" || (station[fuelType] && station[fuelType] !== "");

      const withinDistance =
        userLocation &&
        getDistanceFromLatLonInKm(
          userLocation.latitude,
          userLocation.longitude,
          parseFloat(station.Latitud.replace(",", ".")),
          parseFloat(station["Longitud (WGS84)"].replace(",", "."))
        ) <= distance;

      return matchesCompany && matchesFuel && withinDistance;
    });

    setFilteredStations(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Buscador de Gasolineras</h1>
      <Search
        onFilter={handleFilter}
        empresas={empresas}
        tiposCarburante={tiposCarburante}
      />
      <GasStationsList stations={filteredStations} userLocation={userLocation} />
      <Map stations={filteredStations} userLocation={userLocation} />
      <p>Actividad 3 Georgina Ropez Robredo</p>
    </div>
  );
}

export default App;
