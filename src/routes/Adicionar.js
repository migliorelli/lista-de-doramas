import lemonade from "lemonadejs";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export function Ator() {
  const pagina = lemonade.get("App:Adicionar");

  const remover = () => {
    const filtered = pagina.atores.filter((a, index) => index !== this.index);
    const mapped = filtered.map((a, index) => ({
      nome: a.nome, index
    }));

    pagina.atores = mapped;
  };

  return (render) => render`
    <li class="form-ator">
        <div class="form-controle">
            <label class="label" for="${"ator-" + this.index}">${"Ator(a) " + (this.index + 1)}</label>
            <div class="form-ator-input-container">
                <input type="text" class="input" placeholder="Nome do ator(a)" id="${"ator-" + this.index}" :bind="${this.nome}" />
                < :render="${this.index > 0}" >
                    <button type="button" class="btn btn-icon" onclick="${remover}">
                        <i class="material-icons">delete</i>
                    </button>
                </>
            </div>
        </div>  
    </li>
  `;
}

export default function Adicionar() {
  lemonade.set("App:Adicionar", this);

  this.titulo = "";
  this.atores = [{
    index: 0, nome: ""
  }];

  const adicionarAtor = () => {
    this.atores.push({ index: this.atores.length, nome: "" });
    this.refresh("atores");
  };

  const onsubmit = async (event) => {
    event.preventDefault();
    const atores = this.atores.map((a) => a.nome);
    if (this.titulo.trim() && atores.length > 0 && atores[0].trim()) {
      await addDoc(collection(db, "doramas"), {
        titulo: this.titulo,
        atores
      });

      this.titulo = "";
      this.atores = [{ index: 0, nome: "" }];
      this.refresh();
    }
  };

  return (render) => render`
    <form class="form" onsubmit="${onsubmit}">
        <p style="margin-bottom: 0; font-size: 1.3rem"><b>Adicionar dorama</b></p>

        <div class="form-controle">
            <label class="label" for="titulo">Título do dorama</label>
            <textarea class="input" id="titulo" placeholder="Título do dorama" :bind="${this.titulo}"></textarea>
        </div>

        <div class="form-atores">
            <ul class="form-lista-atores">
                <Ator :loop="${this.atores}" /> 
            </ul>
        </div>
        
        <div class="form-controle-btns">
            <button type="button" class="btn" onclick="${adicionarAtor}">Adicionar ator(a)</button>
            <button type="submit" class="btn">Adicionar dorama</button>
        </div>
    </form>`;
}