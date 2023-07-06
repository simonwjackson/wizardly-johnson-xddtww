# Bug Report

## Investigation:

Upon investigation, it was found that the crash occurs when the application tries to access properties of the `weatherResult` object. This issue is partially due to the initial `null` state of `weatherResult`.

## Solution:

To fix the application crash, optional chaining was added to the `weatherResult` object. This prevents the application from trying to access properties of a null object.

## Recommendations:

1. This solution has surfaced a UX issue: We are not handling at least 2 possible states that the component can be in after its mounted: `LOADING` and `ERROR`. One possible approach is to use `<Suspense />` (with <ErrorBoundary/ >) since we are using the latest version of `next.js`. 
2. for the handling of private environment variables like the `API_KEY`, it would be better to fetch the data server-side and send the result back to the client. This would prevent any sensitive data from being exposed in the client-side code.

I suggest that we address these issues before they hit production.

## Status:

The issue is partially resolved. The application no longer crashes, but there are improvements to be made in terms of UX and handling of private environment variables. These improvements should be addressed in future updates.

# Git Log

## cd1b680: docs: update Notes.md

- Added observations about API_KEY and processing window
- Suggested improvements for UI handling with `<Suspense />` in `next.js`

## d0a40f0: fix(city-weather): handle potential null value in temperature conversion

- Applied a fix to handle potential null values when converting temperature in `city-weather.tsx`. This prevents
 errors when the temperature data might be unavailable.

## c64a1e0: docs: update notes

## b0ffb28: fix(city-weather): add optional chaining to weatherResult

- Ensure that the application does not crash when `weatherResult` or its nested properties are undefined.

## 8b44298: style(city-weather): adjust API fetch url and comment format

- Adjusted the fetch API url in componentDidMount, added a comma at the end
- Ensured there's a newline at the end of the file after the comment 'Forking'

## 940c55d: fix(api-key): update API key in city-weather component
- Updated the API key in the city-weather.tsx file. This is necessary
  for the correct functioning of the weather API calls.
- It should be noted that this private key will be exposed to users. We
  should probably address this before the next release.
