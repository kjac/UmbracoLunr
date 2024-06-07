# Umbraco + Lunr.js Delivery API extension points

This repo contains the sample code for my [blog post](https://kjac.dev/posts/lunrjs-search-powered-by-umbraco/) about powering Lunr.js indexes with the Umbraco Delivery API.

There are two projects in this repo - a server and a client.

## The server

The server is an Umbraco CMS project. You’ll need .NET 8 to run it. Open a terminal window in `src/Server` and run:

```bash
dotnet run
```

The Umbraco database is bundled up as part of the GitHub repo. The administrator login for Umbraco is:

- Username: admin@localhost
- Password: SuperSecret123

## The client

The client is based on Node.js and contains two scripts:

- `build-search-index.js` to generate the Lunr index. The server must be started before running this script.
- `index.js` to run an Express server, which serves a test page to try out the generated index.

With the server running, open a new terminal window in `src/Client` and run:

```bash
npm run build-search-index
npm run start
```
