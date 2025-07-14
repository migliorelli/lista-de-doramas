import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import lemonade from "lemonadejs";

export function Dorama() {
  const remover = async () => {
    if (this.id) {
      await deleteDoc(doc(db, "doramas", this.id));
    }
  };

  return (render) => render`
    <li class="lista-dorama">
        <span><b>Título: </b>${this.titulo}</span>
        <span><b>Atores: </b></span>
        <ul :loop="${this.atores}">
            <li> 
                {{self}}
            </li>
        </ul>
        <button class="btn" onclick="${remover}">Remover</button>
    </li>
  `;
}

export default function Lista() {
  this.lista = [];
  this.listaFiltrada = this.lista;
  this.pesquisa = "";

  lemonade.track("lista");

  this.onenter = () => {
    const unsub = onSnapshot(collection(db, "doramas"), (snapshot) => {
      this.lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });

    this._unsub = unsub;
  };

  this.onleave = () => {
    if (this._unsub) this._unsub();
  };

  const filtrar = (lista, pesquisa) => {
    return lista.filter(dorama => {
        if (dorama.titulo.toLowerCase().includes(pesquisa.toLowerCase())) {
          return true;
        }

        return dorama.atores.some(ator => ator.toLowerCase().includes(pesquisa.toLowerCase()));
      }
    )
      ;
  };

  this.onchange = (prop) => {
    if (prop === "lista" || prop === "pesquisa") {
      this.listaFiltrada = filtrar(this.lista, this.pesquisa);
    }
  };

  return (render) => render`
    <div class="lista-doramas">
        <p style="margin-bottom: 0; font-size: 1.3rem"><b>Lista de doramas</b></p>
        <input type="text" placeholder="Pesquisar..." class="input" :bind="${this.pesquisa}" />
        <ul class="lista-doramas" style="padding: 0; margin: 0">
            <Dorama :loop="${this.listaFiltrada}" />
        </ul>
    </div>
    `;
};