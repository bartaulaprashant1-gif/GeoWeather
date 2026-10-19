import { getWeather } from "./api";
import { useQuery } from "@tanstack/react-query";
import Card from "./components/cards/Card";
import { useState } from "react";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";

function App() {
 const [coords, setCoords] = useState<Coords>({ lat: 27.71, lon: 85.32 })
 const [location, setLocation]=useState('custom')


 const onMapClick=(lat:number, lon:number)=>{
  setCoords({lat, lon})
  setLocation("custom")
 }
 
  return (
    <>
    <div className="flex flex-col gap-8">
      <LocationDropdown location={location} setLocation={setLocation}/>
      <Map coords={coords} onMapClick={onMapClick}/>
      <CurrentWeather coords={coords} location={location} />
      <HourlyForecast coords={coords} location={location}/>
      <DailyForecast coords={coords} location={location}/>
      <AdditionalInfo coords={coords} location={location}/>
    </div>
    </>
  );
}

export default App;
