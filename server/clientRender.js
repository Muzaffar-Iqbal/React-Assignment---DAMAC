import path from "path";
import fs from "fs";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import configureStore from "../client/reduxStore";
import Routes from "../client/routes";
import userService from "./services/userService";
import { decode, getCookie, errorLogger } from "./helpers/utility";

const clientRenderer = (req, res) => {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");
  fs.readFile(filePath, "utf8", async (err, htmlData) => {
    if (err) {
      errorLogger("read err", err);
      return res.status(404).end();
    }
    const context = {};
    const store = configureStore();
    const state = store.getState();
    let authToken = getCookie(req, "authToken");
    if (authToken) {
      try {
        let userId = decode(authToken);
        let user = new userService();
        let userData = await user.getOne({ _id: userId }, ["email", "name"]);
        if (userData) {
          let data = {
            name: userData.name,
            email: userData.email,
            authToken: authToken,
          };
          store.getState().user = data;
          store.getState().is_logged_in = true;
        }
      } catch (e) {
        errorLogger(e);
      }
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Routes store={store} />
          </StaticRouter>
        </Provider>
      );
      if (context.url) {
        res.redirect(302, context.url);
      } else {
        const markupWithApp = `<div id="app">${markup}</div>`;
        const RenderedApp = htmlData.replace(
          '<div id="app"></div>',
          markupWithApp
        );
        const RenderedAppWithState = RenderedApp.replace(
          '"__SERVER_STATE__"',
          JSON.stringify(state)
        );
        res.send(RenderedAppWithState);
      }
    } else {
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Routes store={store} />
          </StaticRouter>
        </Provider>
      );
      if (context.url) {
        res.redirect(302, context.url);
      } else {
        const markupWithApp = `<div id="app">${markup}</div>`;
        const RenderedApp = htmlData.replace(
          '<div id="app"></div>',
          markupWithApp
        );
        const RenderedAppWithState = RenderedApp.replace(
          '"__SERVER_STATE__"',
          JSON.stringify(state)
        );
        res.send(RenderedAppWithState);
      }
    }
  });
};

export default clientRenderer;
