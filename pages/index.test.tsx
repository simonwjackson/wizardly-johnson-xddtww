import "isomorphic-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IndexPage from "./index";

const server = setupServer(
  rest.get(
    "https://api.openweathermap.org/data/2.5/weather",
    (req, res, ctx) => {
      const city = req.url.searchParams.get("q");

      let response;

      switch (city) {
        case "Austin":
          response = {
            coord: { lon: -97.7431, lat: 30.2672 },
            weather: [
              { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
            ],
            base: "stations",
            main: {
              temp: 306.79,
              feels_like: 312.1,
              temp_min: 305.14,
              temp_max: 308.09,
              pressure: 1020,
              humidity: 54,
            },
            visibility: 10000,
            wind: { speed: 5.66, deg: 160 },
            clouds: { all: 0 },
            dt: 1689045255,
            sys: {
              type: 2,
              id: 2003218,
              country: "US",
              sunrise: 1688988996,
              sunset: 1689039337,
            },
            timezone: -18000,
            id: 4671654,
            name: "Austin",
            cod: 200,
          };
          break;
        case "Paris":
          response = {
            coord: { lon: 2.3488, lat: 48.8534 },
            weather: [
              { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
            ],
            base: "stations",
            main: {
              temp: 290.33,
              feels_like: 289.98,
              temp_min: 287.33,
              temp_max: 292.58,
              pressure: 1016,
              humidity: 72,
            },
            visibility: 10000,
            wind: { speed: 1.54, deg: 200 },
            clouds: { all: 0 },
            dt: 1689049787,
            sys: {
              type: 1,
              id: 6550,
              country: "FR",
              sunrise: 1689047915,
              sunset: 1689105185,
            },
            timezone: 7200,
            id: 2988507,
            name: "Paris",
            cod: 200,
          };

          break;
        default:
          response = {
            cod: 404,
            message: "city not found",
          };
      }

      return res(ctx.json(response));
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it shows weather results, based on user query", async () => {
  const queryCity = async (
    city: string | number,
    temp: number,
    description: string,
  ) => {
    const input = screen.getByTestId("weather-input");

    await userEvent.clear(input);
    await userEvent.type(input, city.toString());
    expect(input).toHaveValue(city);
    userEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      screen.getByTestId("city-weather");
      expect(screen.getByTestId("city-weather--name")).toHaveTextContent(
        city.toString(),
      );
      expect(screen.getByTestId("city-weather--temperature")).toHaveTextContent(
        temp.toString(),
      );
      expect(screen.getByTestId("city-weather--description")).toHaveTextContent(
        description,
      );
      expect(
        screen
          .getByTestId("city-weather--icon")
          ?.getAttribute("src")
          ?.startsWith("/_next/image?url="),
      ).toBe(true);
    });
  };

  render(<IndexPage />);

  await queryCity("Austin", 93, "clear sky");
  await queryCity("Paris", 63, "clear sky");
});

test("it handles 404 errors for invalid city input", async () => {
  render(<IndexPage />);
  const input = screen.getByTestId("weather-input");

  await userEvent.type(input, "london, tx");
  userEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    screen.getByText(/city not found/i);
    screen.getByText(/404/i);
  });
});
