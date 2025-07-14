import lemonade from "lemonadejs";
import "@lemonadejs/router";
import "@lemonadejs/toolbar";

import App from "./App";
import { Ator } from "./routes/Adicionar";
import { Dorama } from "./routes/Lista";

import "@lemonadejs/router/dist/style.css";
import "@lemonadejs/toolbar/dist/style.css";

import "./assets/base.css";
import "./assets/adicionar.css";
import "./assets/lista.css";

lemonade.setComponents({ Ator, Dorama });
lemonade.render(App, document.getElementById("root"));
