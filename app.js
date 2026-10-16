let agenti = [];

fetch("agenti.json")
  .then(response => response.json())
  .then(data => {
    agenti = data;
  });

document.addEventListener("DOMContentLoaded", () => {

  const campoRichiedente =
    document.getElementById("cognomeRichiedente");

  const pulsante =
    document.getElementById("aggiungiAgente");

  if (campoRichiedente) {
    campoRichiedente.addEventListener("input", trovaRichiedente);
  }

  if (pulsante) {
    pulsante.addEventListener("click", aggiungiAgente);
  }

});

function trovaRichiedente() {

  const cognome = document
    .getElementById("cognomeRichiedente")
    .value
    .toUpperCase();

  const agente = agenti.find(
    a => a.cognome === cognome
  );

  if (!agente) {
    return;
  }

  document.getElementById("nomeRichiedente").value =
    agente.nome;

  document.getElementById("cidRichiedente").value =
    agente.cid;

}

function aggiungiAgente() {

  const contenitore =
    document.getElementById("contenitoreAgenti");

  const blocco = document.createElement("blocco");

  blocco.className = "blocco-agente";

  blocco.innerHTML = `
    <hr>

    <h3>Agente</h3>

    <label>Cognome</label>
    <input class="cognomeAgente">

    <label>Nome</label>
    <input class="nomeAgente" readonly>

    <label>CID</label>
    <input class="cidAgente" readonly>

    <label>Turno</label>

    <select class="turno">
      <option>M</option>
      <option>M1</option>
      <option>M2</option>
      <option>M3</option>
      <option>P</option>
      <option>SIEF</option>
      <option>N</option>
      <option>NI</option>
      <option>N3</option>
    </select>

    <label>Straordinario</label>
    <input class="straordinario">

    <br><br>

    <label><input type="checkbox"> ChRep</label>
    <label><input type="checkbox"> ChDisp</label>
    <label><input type="checkbox"> Trasferta</label>
    <label><input type="checkbox"> Linea</label>

    <br>

    <label><input type="checkbox"> Galleria</label>
    <label><input type="checkbox"> Sost.Nocive</label>
    <label><input type="checkbox"> Scorta</label>
    <label><input type="checkbox"> TI</label>

    <br><br>

    <button type="button">Elimina</button>
  `;

  contenitore.appendChild(blocco);

  const cognomeInput =
    blocco.querySelector(".cognomeAgente");

  cognomeInput.addEventListener("input", () => {

    const cognome =
      cognomeInput.value.toUpperCase();

    const agente =
      agenti.find(
        a => a.cognome === cognome
      );

    if (!agente) {
      return;
    }

    blocco.querySelector(".nomeAgente").value =
      agente.nome;

    blocco.querySelector(".cidAgente").value =
      agente.cid;

  });

  blocco
    .querySelector("button")
    .addEventListener("click", () => {
      blocco.remove();
    });

}
