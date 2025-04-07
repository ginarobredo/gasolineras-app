import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

function Map({ userLocation, stations }) {
  const center = userLocation
    ? { lat: userLocation.latitude, lng: userLocation.longitude }
    : { lat: 40.4168, lng: -3.7038 }; // Default: Madrid

  return (
    <LoadScript googleMapsApiKey="AIzaSyAuarYQeO65UzapIpSOYLOQW5Tw_J_mWgM">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
        {userLocation && <Marker position={center} label="Tú" />}

        {stations.map((station, index) => {
          const lat = parseFloat(station.Latitud.replace(",", "."));
          const lng = parseFloat(station["Longitud (WGS84)"].replace(",", "."));
          return (
            <Marker
              key={index}
              position={{ lat, lng }}
              title={`${station.Rótulo}\n${station.Dirección}`}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
