import Image from "next/image";
import React, { useEffect, useState } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "a08377ee14fac6dc7f67ade10d26d8ec";

interface CityWeatherProps {
  city: string;
}

const OPENWEATHERMAP_2X_SIZE = 100;

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
    <div className="p-4 drop-shadow-lg rounded-md bg-white flex flex-col justify-items-center text-gray-400 font-medium">
      <h1 className="text-center uppercase text-xl font-black text-gray-600">
        {city}
      </h1>
      <Image
        className="mx-auto"
        width={OPENWEATHERMAP_2X_SIZE}
        height={OPENWEATHERMAP_2X_SIZE}
        alt="weather icon"
        src={`http://openweathermap.org/img/wn/${weatherResult?.weather[0]
          ?.icon}@2x.png`}
      />
      <div className="text-center capitalize mb-2 font-bold">
        {weatherResult?.weather[0]?.description}
      </div>
      <div className="text-center text-xs">
        Temperature:{" "}
        <span className="text-3xl text-black">
          {KtoF(weatherResult?.main?.temp)?.toFixed(0)}&#8457;
        </span>
      </div>
    </div>
  );
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export default CityWeather;
