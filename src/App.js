import Adicionar from "./routes/Adicionar";
import Lista from "./routes/Lista";
import lemonade from "lemonadejs";

export default function App() {
  lemonade.set("App:Lista", this);
  this.lista = [];

  return render => render`
    <>
        <Router animation="${false}">
            <Route path="/" controller="${Adicionar}" />
            <Route path="/lista" controller="${Lista}" />
        </Router>
        <Toolbar>
            <a data-icon="playlist_add" title="Adicionar" href="/" />
            <a data-icon="menu" title="Lista" href="/lista" />
        </Toolbar>
    </>
    `;
}