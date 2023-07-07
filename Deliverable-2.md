# Report

## Investigation:

* The Only design presented was the state of a "happy path". I might have to add some UI state to represent error states, etc.
* `78787`, `Austin` & `Austin, Texas` are valid queries. However, `Austin, TX` returns a 404.
* `drop-shadow-*` appears to apply to all child elements if a background on the container is not set.

## Recommendations:

1. The API key will be exposed to the end user with the current implementation. The fetch should happen server side.
2. We only have a design for a successful fetch to the API. We might need to think about error & loading states as well.
3. There is room for improvement regarding validation of the data retrieved from the API. We could implement a schema validation step, but that might be overkill for this scenario.

## Status:

While the tests are passing, there is an unfortunate issue with one of the node modules

> BUG: isomorphic-unfetch appears to be causing a segfault when running tests

Running jest with this module causes this error:

> error: Command failed with signal "SIGSEGV".

I can get around this by using node 18+ and adding globals to the jest config
However, with this approach, we loose the ability to use msw for mocking
Unfortunately, this means we will need to use real network requests to run these tests.
Before moving forward with any other features, we should address this bug.

# Changelog

ecc9fbf - fix(city-weather): handle fetch error in city weather component
- Added error handling to the fetch API call in the CityWeather component
- In case of an error, the weather result is set to an object with a code of -1 and a message of "fetch error"

433fe02 - test(index): add test case for 404s
- Added a new test case to handle 404 errors in index.test.tsx
- This test case checks if the application correctly handles the scenario when a city is not found

ca74508 - fix(testing): resolve segfault by disabling isomorphic-unfetch
- Commented out import and usage of "isomorphic-unfetch" and "msw" due to a segfault error during testing
- Updated the test "it shows weather results" to use real network requests
- Commented out tests for handling network and 404 errors as they rely on msw for mocking responses

5f503bb - refactor(city-weather): improve error handling and null check
- Added isObjectEmpty function to check if weatherResult object is empty
- Changed initial state of weatherResult from null to empty object
- Added conditional rendering based on the state of weatherResult
- Updated the component to display an error message when the API request fails
- Updated the styling of the error message
- Improved layout and formatting of the component

9126275 - style(index): add data-testid to city-weather div
- add data-testid for better testing

bc9c08e - refactor(index): update form handling in index.tsx
- Extract inline handlers into separate functions
- Add state for form input
- Simplify form submission logic
- Update input field to control component

c46620d - fix(index): handle potential null value in form data
- Fixed potential bug where formdata.get("city") could return null
- This change ensures that we are calling toString() method on a valid object, preventing possible runtime errors.

a2339ec - style(city-weather-refactor): improve readability and accessibility
- add aria-busy attribute for improved accessibility

b2faf87 - style(index): enhance readability and accessibility of weather search form
- Added 'htmlFor' attribute to label for accessibility
- Added 'id' attribute to input for better form control

76ef6b0 - style(ui): improve form layout and styling
- Added margin-top to form for better spacing
- Replaced span with label for accessibility
- Adjusted layout of city weather display

25565f2 - style: adjust visual layout and temperature display
- adjusted temperature display in city-weather-refactor.tsx for better readability
- added background color and screen height to div in index.tsx for improved visual layout

2f38ba5 - style(city-weather): update styling and layout
- Updated class styling in `city-weather-refactor.tsx` for better visual hierarchy
- Simplified `CityWeather` component usage in `index.tsx` for cleaner code structure

c87c05b - style(city-weather-refactor): update UI styles
- Update div class to include text-gray-400
- Change description div to include capitalize and mb-2 classes
- Update text-3xl span to include text-black class

9010ed1 - feat(city-weather): add weather icon to city weather component
- Add constant for openweathermap icon size
- Add Image component to display weather icon
- Update next.config.js to allow images from openweathermap
- Increase width of CityWeather component in index.tsx

c962b5c - style(city-weather-refactor): enhance component UI
- Update CityWeather component styling for improved readability
- Add new CSS classes for better styling
- Modify temperature display for larger font size

5991cea - style(city-weather-refactor): improve layout and reorder elements
- Updated div class to flex layout for better alignment
- Reordered weather description and temperature elements for clarity

cfacab0 - style(UI): update layout for CityWeather component
- Adjusted CityWeather component to center and constrain width for better visual presentation.
- The container (page) determines the width of the component. This will
  allow the component to dynamically adjust it's width based on its context.

e0511d4 - refactor(city-weather): convert city-weather to use hooks
- Update import in `index.tsx` to use new `city-weather-refactor.tsx`
