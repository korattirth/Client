import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/layout/App";
import { createBrowserHistory } from "history";
import CustomRouter from "./app/layout/CustomRouter";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CustomRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </CustomRouter>
);
