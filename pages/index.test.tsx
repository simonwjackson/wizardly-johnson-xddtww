// BUG: isomorphic-unfetch appears to be causing a segfault when running tests
// error: Command failed with signal "SIGSEGV".
// I can get around this by using node 18+ and adding globals to the jest config
// However, with this approach, we loose the ability to use msw for mocking
// Unfortunately, this means we will need to use real network requests to run these tests.
// Before moving forward with any other features, we should address this bug.

// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IndexPage from "./index";

// const server = setupServer(
//   rest.get("https://api.openweathermap.org/data/**", (_req, res, ctx) => {
//     return res(
//       ctx.json({
//         weather: [
//           {
//             description: "Overcast clouds",
//           },
//         ],
//         main: {
//           // temp in Kelvin
//           temp: 295.372,
//         },
//       }),
//     );
//   }),
// );
//
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

test("it shows weather results", async () => {
  render(<IndexPage />);
  const input = screen.getByTestId("weather-input");

  await userEvent.type(input, "New York");
  expect(input).toHaveValue("New York");
  userEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    screen.getByTestId("city-weather");
  });
});

// test("it handles a network error", async () => {
//   server.use(
//     rest.get("https://api.openweathermap.org/*", (_req, res, ctx) => {
//       return res(ctx.status(500));
//     }),
//   );
//   render(<IndexPage />);
//
//   userEvent.type(screen.getByTestId("weather-input"), "New York");
//   userEvent.click(screen.getByText(/submit/i));
//
//   await screen.findByText(/something went wrong/i);
// });

// test("it handles a 404 error", async () => {
//   server.use(
//     rest.get("https://api.openweathermap.org/*", (_req, res, ctx) => {
//       return res(ctx.json({ "cod": "404", "message": "city not found" }));
//     }),
//   );
//   render(<IndexPage />);
//
//   userEvent.type(screen.getByTestId("weather-input"), "London, TX");
//   userEvent.click(screen.getByText(/submit/i));
//
//   await screen.findByText(/city not found/i);
// });
