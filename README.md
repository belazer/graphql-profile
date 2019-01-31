# Usage:

```
yarn
yarn start ./example.config.js
```

# New endpoint:
copy paste `example.config.js` to a new file and call `yarn start <path to file>`
or download configs from 1password called `graphql-profile-customer-configs` and unzip in this repo

# Logging

If you want to log the duration for each request as well as errors make sure to add

```
const LOGGING = true;
```

to your config. 

Also make sure to export `LOGGING` in the `module.exports` in your config.

Example:

```
module.exports = {
  QUERY,
  API,
  TOKEN,
  ITERATIONS,
  PARALLEL,
  LOGGING,
};
```

