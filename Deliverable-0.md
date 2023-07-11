# Notes

* On my first pass at this, I noticed a security vulnerability in the original design. It wasn't explicitly called out as an action item in the assessment, so I had noted it in my "bug report". I'm not sure if you were originally looking for me to address the security issue, but as I had some time, I went ahead and fixed the issue.
* Originally, I had added the openweathermap key to codesandbox's "secrets": https://codesandbox.io/docs/learn/environment/secrets#setting-env-variables-and-secrets
* However, I'm now reverting back to a hardcoded API key just incase this causes issues for others viewing the assesment. You can now find the key located inside a new api endpoint here: `pages/api/weather.ts`