# Deliverable 1:

## Bug Report

### Investigation:

Upon investigation, it was found that the crash occurs when the application tries to access properties of the `weatherResult` object. This issue is partially due to the initial `null` state of `weatherResult`.

## Solution:

To fix the application crash, optional chaining was added to the `weatherResult` object. This prevents the application from trying to access properties of a null object.

## Recommendations:

1. This solution has surfaced a UX issue: We are not handling at least 2 possible states that the component can be in after its mounted: `LOADING` and `ERROR`. One possible approach is to use `<Suspense />` (with <ErrorBoundary/ >) since we are using the latest version of `next.js`. 
2. for the handling of private environment variables like the `API_KEY`, it would be better to fetch the data server-side and send the result back to the client. This would prevent any sensitive data from being exposed in the client-side code.

I suggest that we address these issues before they hit production.

## Status:

The issue is partially resolved. The application no longer crashes, but there are improvements to be made in terms of UX and handling of private environment variables. These improvements should be addressed in future updates.
