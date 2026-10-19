import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import type { ReactEventHandler } from "react";
import type { Coords } from "../types";

type Props = {
  coords:Coords,
  onMapClick:(lat:number, lon:number)=>void
};

export default function Map({coords, onMapClick}: Props) {
  const {lat, lon}=coords
  return (
    <MapContainer
    center={[lat,lon]}
    zoom={5}
    style={{ width: "100%", height: "500px", zIndex:'50' }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}


function MapClick({onMapClick}:{onMapClick:(lat:number, lon:number)=>void}){
  const map=useMap()

  map.on('click', (e:any)=>{
    const {latlng}=e
    map.panTo([latlng.lat, latlng.lng])
    onMapClick(latlng.lat, latlng.lng)
  })

  return null
}