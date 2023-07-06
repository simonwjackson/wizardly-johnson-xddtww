# Notes

## Deliverable 1:

App does indeed crash when submitting the form. Looking at the call stack in the dev console, it appears that the object `weatherResult` is null. The Next.js app is showing a code snippet that points to line 42 in the `components/city-weather.tsx` file. I see the `weatherResult` object on this line and we are trying to accces the `main.temp` value within. I'm guessing that these values may or may not exist.. depending on how this was implemented. It's likey that optional chaining will fix the issue, but I'll jump into the code to start investigating.

After opening the `components/city-weather.tsx` file, i can see that the `API_KEY` is missing (as mentioned in the README). This might be one of the culprits, however, even with a valid api key there are a handful of edge cases that could cause a similar error. Also, I don't feel comfortable adding a key to version control so I will need to address this before integrating the code back into trunk/main.

On first pass, the state of `weatherResult` will be `null`. This will cause the application to crash if we attempt to access properties off the object. Adding optional chaining did fix this issue. However, there is a potential UX issue: When the `weatherResult` is in a null state, ex: during loading or a fetch error, the labels will show without any data. This was not requested in the deliverable, so I'll make sure to make a note in the ticket.

I'm remembering now that private environment variables must be accessed server side, so we would need to fetch the data and send the result back to the client.

Also, generally speaking, we shouldn't commit any sensitive data into the repo so I'm going to add the new key as an environment variable so that it can be refrenced at runtime. I'll go ahead and make the change and make my first `git commit`.

No immediate change after adding a valid API_KEY, maybe I am still within the 2 hour processing window that was mentioned in the README? 
