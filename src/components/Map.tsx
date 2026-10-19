import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import type { Coords, LocationCoords } from "../types";

type Props = {
  coords:Coords,
  onMapClick:(lat:number, lon:number)=>void;
  locationCoords:LocationCoords;
  mapType:string
};

type mapCoords={
  lat?:number;
  latitude?:number;
  lon?:number;
  longitude?:number;
}

export default function Map({coords, onMapClick, locationCoords, mapType}: Props) {
  let {lat, lon}=coords;

  let currentTime=(new Date().getHours()).toString();
  if(parseInt(currentTime)<10){
    currentTime=`0${currentTime}`
  }
  return (
    <MapContainer
    center={locationCoords.latitude!=0 && locationCoords.longitude!=0?[locationCoords.latitude,locationCoords.longitude]:[lat, lon]}
    zoom={5}
    style={{ width: "100%", height: "500px", zIndex:'50' }}
    >
      <MapClick onMapClick={onMapClick} coords={locationCoords.latitude!=0 && locationCoords.longitude!=0?{lat:locationCoords.latitude, lon:locationCoords.longitude}:{lat:coords.lat, lon:coords.lon}}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer opacity={0.6}  url={`https://weathermaps.weatherapi.com/${mapType}/tiles/${new Date().toISOString().slice(0,10).replaceAll('-', '')}${currentTime}/{z}/{x}/{y}.png`}/>
      <Marker position={locationCoords.latitude!=0 && locationCoords.longitude!=0?[locationCoords.latitude,locationCoords.longitude]:[lat, lon]} />
    </MapContainer>
  );
}


function MapClick({onMapClick, coords}:{onMapClick:(lat:number, lon:number)=>void, coords:mapCoords}){
  const map=useMap()
  map.panTo([coords.lat, coords.lon])

  map.on('click', (e:any)=>{
    const {latlng}=e
    onMapClick(latlng.lat, latlng.lng)
  })

  return null
}