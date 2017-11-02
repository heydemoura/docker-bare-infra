import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import sourceMapSupport from "source-map-support";
import App from "../shared/App";
import routes from "../shared/routes";

if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}

const app = express();

app.use(cors())
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  let match;
  let currentRoute = routes.find(route => {
    let matchTest = matchPath(req.url, route);
    if (matchTest) {
      match = matchTest;
      return true;
    }
  });

  const fetchInitialState = currentRoute.loadData && currentRoute.loadData(match.params);

  Promise.resolve(fetchInitialState)
    .then(initialState => {
      const context = { initialState };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(`
        <!DOCTYPE html>
          <head>
            <title>Super Duper Server Side Rendered React Application</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialState__ = ${JSON.stringify(initialState)}</script>
          </head>
          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("--> Server running on port ", process.env.PORT || 3000);
});
