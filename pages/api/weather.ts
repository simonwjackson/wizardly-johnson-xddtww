import { NextApiRequest, NextApiResponse } from "next";
import "isomorphic-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { q: city } = req.query;

  try {
    const { OPENWEATHERMAP_API_KEY } = process.env;
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`,
    ).then((r) => r.json());

    return res.status(200).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
