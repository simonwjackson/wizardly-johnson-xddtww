import React, { useEffect, useState } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "a08377ee14fac6dc7f67ade10d26d8ec";

interface CityWeatherProps {
  city: string;
}

function CityWeather({ city }: CityWeatherProps) {
  const [weatherResult, setWeatherResult] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    )
      .then((r) => r.json())
      .then((result) => setWeatherResult(result));
  }, [city]);

  return (
    <div className="flex flex-col justify-items-center">
      <h1 className="text-center">{city}</h1>
      <div className="text-center">
        Description: {weatherResult?.weather[0]?.description}
      </div>
      <div className="text-center">
        Temperature: {KtoF(weatherResult?.main?.temp)?.toFixed(0)} &#8457;
      </div>
    </div>
  );
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export default CityWeather;
