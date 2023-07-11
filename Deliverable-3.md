# Report

## Status:

Originally, I was unable to run `msw` within jest as every call to fetch would result in a `segfault`. I tracked this down to the module `isomorphic-unfetch`, however I was unable to determine exactly why this module was causing the tests to crash. Originally, I was able to get the tests to pass using the real API endpoint, but this was less than ideal. After trying several alternative fetch modules, I found that `isomorphic-fetch` did allow `msw` to intercept the tests to use the mocked server as originally intended.

Also, as mentioned in a previous report, I did notice a security vulnerability (exposed secret key) in the original design. It wasn't explicitly called out as an action item in the assessment, so I just left it as is. However, due to the potential severity of the issue, I went ahead and built a fix by proxying the openweathermap API.

# Changelog

## 4a05014 - refactor(config): update Access-Control-Allow-Origin in next.config.js
- Added a TODO comment to look into a more secure way to limit ACL dynamically.

## 6720e8d - feat(next.config): add headers function to next config
- Added an async headers function to next.config.js
- Set Access-Control-Allow-Origin header for all API routes

## 0929580 - refactor: remove HOST constant, update fetch URLs
- Deleted the HOST constant from common/constants.ts
- Updated the URLs in fetch requests to use relative paths in city-weather-refactor.tsx and index.test.tsx
- Moved WeatherResponse import from common/types to pages/api/weather in city-weather-refactor.tsx
- Added a comment about the empty mock in index.test.tsx

## 4421bbb - refactor(city-weather-refactor): update state management and error handling
- Added FetchState enum for better fetch state management
- Changed fetch method to async/await for better error handling
- Updated weatherResult type to WeatherResponse | PlainObject
- Added error handling for server errors
- Updated test cases to reflect changes in city-weather-refactor.tsx
- Added new test cases for handling server errors
- Updated weather descriptions in test cases
- Mocked fetch in test cases to simulate server errors

## e4c9dc0 - style(index.tsx): simplify class in weather search label
- Removed 'flex' from class in label for weather search in index.tsx

## 7776a22 - refactor(weather): add detailed weather response type
- Added a new type `WeatherResponse` to handle detailed weather data from API
- Updated the API handler to use the new `WeatherResponse` type for parsing the API response
- Updated the API response from `res.status(200).json(apiResponse)` to `res.status(200).json(json)` to reflect the use of the new type

## 8cf7ef2 - refactor(utils): remove isObjectEmpty function
- Removed the isObjectEmpty function from utils.ts and its related tests from utils.test.ts
- Updated the city-weather-refactor.tsx to import PlainObject from utils.ts instead of isObjectEmpty

## dbca47e - refactor(weather): remove hardcoded API key
- Removed hardcoded OPENWEATHERMAP_API_KEY from city-weather-refactor.tsx
- Added a new file weather.ts in pages/api
- The API key is now fetched from environment variables in weather.ts
- This enhances the security by not exposing the API key in the code.

## 2ca2755 - refactor(constants, city-weather-refactor, index.test): move api endpoint to constants
- Created a new constants file to store the API endpoint
- Refactored city-weather-refactor and index.test to use the new constant instead of the hard-coded value
- This change improves code maintainability and makes it easier to update the API endpoint in the future

## eceb6cd - test: handle a 404 response
- Refactored the test "it shows weather results, based on user query" to be more flexible and handle different city inputs.
- Added a new test "it handles 404 errors for invalid city input" to check the application's behavior when the input city is not found.

## b4637e4 - test(city-weather): add city-weather integration tests
- Updated city-weather-refactor.tsx to include test id for better testing
- Modified index.test.tsx to include more specific tests
- Improved error handling in tests
- Removed commented out code
- Changed mock server response to handle different cities
- Updated tests to check for specific city weather information

## b159a7e - fix(package): change dependency from isomorphic-unfetch to isomorphic-fetch
- Changed "isomorphic-unfetch" to "isomorphic-fetch" in package.json dependencies.

## dd56b9a - refactor(testing): retore initial tests

## 07431b3 - refactor: move KtoF function to utils
- Moved the KtoF function from `city-weather-refactor.tsx` to `utils.ts`
- Added tests for the KtoF function in `utils.test.ts`
- Updated imports in `city-weather-refactor.tsx` and `utils.test.ts` to include the KtoF function from `utils.ts`

## f25ca63 - fix(city-weather): change API key variable name
- Changed the API key variable from `API_KEY` to `OPENWEATHERMAP_API_KEY` in city-weather-refactor.tsx for better specificity.

## 3f5f4b4 - refactor: split utility function to separate file
- Moved `isObjectEmpty` function to `utils.ts` and its tests to `utils.test.ts`
- Removed `isObjectEmpty` function from `city-weather-refactor.tsx`
- Adjusted imports in `city-weather-refactor.tsx` to use the new utility function
- Changed API key constant name to `OPENWEATHERMAP_API_KEY`
