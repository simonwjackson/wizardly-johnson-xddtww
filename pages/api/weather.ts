import { NextApiRequest, NextApiResponse } from "next";
import "isomorphic-fetch";

// TODO: This type might not account for every possible return type.
export type WeatherResponse =
  | {
      coord: {
        lon: number;
        lat: number;
      };
      weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
      }>;
      base: string;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
      };
      visibility: number;
      wind: {
        speed: number;
        deg: number;
      };
      clouds: {
        all: number;
      };
      dt: number;
      sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
      };
      timezone: number;
      id: number;
      name: string;
      cod: number;
    }
  | {
      cod: string;
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q: city } = req.query;

  try {
    // TODO: use process.env in the near future
    // const { OPENWEATHERMAP_API_KEY } = process.env;
    const OPENWEATHERMAP_API_KEY = "a08377ee14fac6dc7f67ade10d26d8ec";
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`
    );
    const json: WeatherResponse = await apiResponse.json();

    return res.status(200).json(json);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
