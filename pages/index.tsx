import { useState } from "react";
import CityWeather from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);
  return (
    <div className="py-2 bg-zinc-100 h-screen">
      <form
        className="flex items-center justify-center mt-16"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          setCity(formdata.get("city").toString());
        }}
      >
        <div className="mb-16 flex">
          <label className="flex block font-medium leading-6 font-medium w-full self-center justify-self-end mr-4">
            Weather Search:
          </label>
          <input
            data-testid="weather-input"
            type="text"
            name="city"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />{" "}
          <button
            type="submit"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white bg-sky-600 uppercase ring-inset"
          >
            Submit
          </button>
        </div>
      </form>

      {city && (
        <div className="flex items-center justify-center">
          <CityWeather city={city} />
        </div>
      )}
    </div>
  );
}
