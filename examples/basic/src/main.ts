import { createElement} from "@bloxi/core";
import { renderRoot } from "@bloxi/core";
import LandingPage from "./App";

const appElement = createElement(LandingPage) as React.ReactElement;
renderRoot(appElement);