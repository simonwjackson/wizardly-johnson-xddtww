import Image from "next/image";
import { useEffect, useState } from "react";
import { HOST } from "../common/constants";
import { isObjectEmpty, KtoF } from "../common/utils";

const OPENWEATHERMAP_2X_SIZE = 100;

interface CityWeatherProps {
  city: string;
}

function CityWeather({ city }: CityWeatherProps) {
  const [weatherResult, setWeatherResult] = useState<any>({});

  useEffect(() => {
    fetch(`${HOST}/api/weather?q=${city}`)
      .then((r) => r.json())
      .then((result) => setWeatherResult(result))
      .catch(() => setWeatherResult({ cod: -1, message: "fetch error" }));
  }, [city]);

  return (
    <div aria-busy={isObjectEmpty(weatherResult)}>
      {(weatherResult?.cod === 200 && (
        <div className="p-4 drop-shadow-lg rounded-md bg-white flex flex-col justify-items-center text-gray-400 font-medium">
          <h1
            className="text-center uppercase text-xl font-black text-gray-600"
            data-testid="city-weather--name"
          >
            {weatherResult.name}
          </h1>
          <Image
            className="mx-auto"
            width={OPENWEATHERMAP_2X_SIZE}
            height={OPENWEATHERMAP_2X_SIZE}
            alt="weather icon"
            data-testid="city-weather--icon"
            src={`http://openweathermap.org/img/wn/${weatherResult?.weather[0]
              ?.icon}@2x.png`}
          />
          <div
            data-testid="city-weather--description"
            className="text-center capitalize mb-2 font-bold"
          >
            {weatherResult?.weather[0]?.description}
          </div>
          <div className="text-center text-xs">
            Temperature:
            <span
              className="text-3xl text-black ml-2"
              data-testid="city-weather--temperature"
            >
              {KtoF(weatherResult?.main?.temp)?.toFixed(0)}&#8457;
            </span>
          </div>
        </div>
      )) || (
        <div className="rounded-md bg-red-50 p-4 drop-shadow-lg">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error: {weatherResult.cod}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                {weatherResult.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityWeather;
