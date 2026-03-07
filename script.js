let obras = JSON.parse(localStorage.getItem("obras")) || [];
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

const btnCriarObra = document.getElementById("btnCriarObra");
const btnRegistrarGasto = document.getElementById("btnRegistrarGasto");
const toggleTheme = document.getElementById("toggleTheme");

btnCriarObra.addEventListener("click", criarObra);
btnRegistrarGasto.addEventListener("click", registrarGasto);

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function salvarDados() {
  localStorage.setItem("obras", JSON.stringify(obras));
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

function criarObra() {
  let nome = document.getElementById("nomeObra").value;
  let local = document.getElementById("localObra").value;
  let prazo = document.getElementById("prazoObra").value;

  if (!nome) {
    alert("Digite o nome da obra");
    return;
  }

  let obra = {
    id: Date.now(),
    nome,
    local,
    prazo,
  };

  obras.push(obra);

  salvarDados();

  document.getElementById("nomeObra").value = "";
  document.getElementById("localObra").value = "";
  document.getElementById("prazoObra").value = "";

  renderObras();
}

function renderObras() {
  let lista = document.getElementById("listaObras");
  let select = document.getElementById("obraSelecionada");

  lista.innerHTML = "";
  select.innerHTML = "";

  obras.forEach((obra) => {
    let li = document.createElement("li");

    li.textContent = obra.nome + " - " + obra.local;

    lista.appendChild(li);

    let option = document.createElement("option");

    option.value = obra.id;
    option.textContent = obra.nome;

    select.appendChild(option);
  });
}

function registrarGasto() {
  let obraId = document.getElementById("obraSelecionada").value;
  let descricao = document.getElementById("descricaoGasto").value;
  let valor = document.getElementById("valorGasto").value;
  let data = document.getElementById("dataGasto").value;
  let categoria = document.getElementById("categoriaGasto").value;

  if (!descricao || !valor) {
    alert("Preencha os campos");
    return;
  }

  let gasto = {
    id: Date.now(),
    obraId,
    descricao,
    valor,
    data,
    categoria,
  };

  gastos.push(gasto);

  salvarDados();

  document.getElementById("descricaoGasto").value = "";
  document.getElementById("valorGasto").value = "";

  renderGastos();
}

function renderGastos() {
  let tabela = document.getElementById("tabelaGastos");

  tabela.innerHTML = "";

  gastos.forEach((gasto, index) => {
    let obra = obras.find((o) => o.id == gasto.obraId);

    let tr = document.createElement("tr");

    tr.innerHTML = `

<td>${obra ? obra.nome : "-"}</td>
<td>${gasto.descricao}</td>
<td>${gasto.categoria}</td>
<td>R$ ${gasto.valor}</td>
<td>${gasto.data}</td>

<td>
<button onclick="removerGasto(${index})" class="btn-primary">
Excluir
</button>
</td>

`;

    tabela.appendChild(tr);
  });
}

function removerGasto(index) {
  gastos.splice(index, 1);

  salvarDados();

  renderGastos();
}

renderObras();
renderGastos();
