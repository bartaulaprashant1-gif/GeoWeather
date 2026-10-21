import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords, LocationCoords } from "../types";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  locationCoords: LocationCoords;
  mapType: string;
};

type mapCoords = {
  lat?: number;
  latitude?: number;
  lon?: number;
  longitude?: number;
};

const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;

export default function Map({
  coords,
  onMapClick,
  locationCoords,
  mapType,
}: Props) {
  let { lat, lon } = coords;

  let currentTime = new Date().getHours().toString();
  if (parseInt(currentTime) < 10) {
    currentTime = `0${currentTime}`;
  }

  const center: LatLngExpression =
    locationCoords.latitude !== 0 && locationCoords.longitude !== 0
      ? [locationCoords.latitude, locationCoords.longitude]
      : [lat, lon];

  const defaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ width: "100%", height: "500px", zIndex: "50" }}
    >
      <MapClick
        onMapClick={onMapClick}
        coords={
          locationCoords.latitude != 0 && locationCoords.longitude != 0
            ? { lat: locationCoords.latitude, lon: locationCoords.longitude }
            : { lat: coords.lat, lon: coords.lon }
        }
      />
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        url={`https://api.maptiler.com/maps/dataviz-v4-dark/256/{z}/{x}/{y}.png?key=${mapTilerKey}`}
      />
      {mapType !== "none" && (
        <TileLayer
          opacity={0.4}
          url={`https://weathermaps.weatherapi.com/${mapType}/tiles/${new Date().toISOString().slice(0, 10).replaceAll("-", "")}${currentTime}/{z}/{x}/{y}.png`}
        />
      )}
      <Marker
        position={
          locationCoords.latitude != 0 && locationCoords.longitude != 0
            ? [locationCoords.latitude, locationCoords.longitude]
            : [lat, lon]
        }
        icon={defaultIcon}
      />
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: mapCoords;
}) {
  const map = useMap();
  coords.lat && coords.lon && map.panTo([coords.lat, coords.lon]);

  map.on("click", (e: any) => {
    const { latlng } = e;
    onMapClick(latlng.lat, latlng.lng);
  });

  return null;
}
