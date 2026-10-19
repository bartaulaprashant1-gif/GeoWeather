import { WeatherSchema } from "./schemas/weatherSchemas";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon, location }: { lat: number; lon: number;location:string }) {
  let  url=`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=2&aqi=yes&alerts=no`
  if(location!=="custom") {
    url=`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=2&aqi=yes&alerts=no`
  }
  const res = await fetch(url);
  const data = await res.json();
  const result = WeatherSchema.safeParse(data);

  if (!result.success) {
    console.error("Zod validation errors:");
    console.dir(result.error.issues, { depth: null });
  } else {
    return result.data
  }
}
