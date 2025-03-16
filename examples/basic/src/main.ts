import { createElement } from "@bloxi/core";
import { renderRoot } from "@bloxi/core";
import App from "./App";

const appElement = createElement(App) as React.ReactElement;
renderRoot(appElement);
