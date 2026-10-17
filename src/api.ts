import { WeatherSchema } from "./schemas/weatherSchemas"

const API_KEY=import.meta.env.VITE_API_KEY

export async function getWeather(){
    const res=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=London&days=1&aqi=yes&alerts=no`)
    const data=await res.json()
    return WeatherSchema.parse(data)
}
