let agenti = [];

fetch("agenti.json")
  .then(response => response.json())
  .then(data => {
    agenti = data;
  });

document.addEventListener("DOMContentLoaded", () => {

  document
    .getElementById("cognomeRichiedente")
    .addEventListener("input", trovaRichiedente);

  document
    .getElementById("aggiungiAgente")
    .addEventListener("click", aggiungiAgente);

  document
    .getElementById("rivedi")
    .addEventListener("click", generaRiepilogo);

  document
    .getElementById("modifica")
    ?.addEventListener("click", () => {

      document.getElementById("riepilogo").innerHTML = "";

      const azioni =
        document.getElementById("azioniFinali");

      if (azioni) {
        azioni.style.display = "none";
      }

    });

});

function trovaRichiedente() {

  const cognome =
    document
      .getElementById("cognomeRichiedente")
      .value
      .toUpperCase();

  const agente =
    agenti.find(
      a => a.cognome === cognome
    );

  if (!agente) {
    return;
  }

  document
    .getElementById("nomeRichiedente")
    .value = agente.nome;

  document
    .getElementById("cidRichiedente")
    .value = agente.cid;

  const contenitore =
    document.getElementById("contenitoreAgenti");

  if (
    !document.getElementById("agenteRichiedente")
  ) {

    aggiungiAgente(true);

    const primoAgente =
      document.getElementById("agenteRichiedente");

    primoAgente.querySelector(".cognomeAgente").value =
      agente.cognome;

    primoAgente.querySelector(".nomeAgente").value =
      agente.nome;

    primoAgente.querySelector(".cidAgente").value =
      agente.cid;

  }

}

function aggiungiAgente(richiedente = false) {

  const agentiPresenti =
    document.querySelectorAll(".blocco-agente");

  if (!richiedente && agentiPresenti.length > 0) {

    const ultimo =
      agentiPresenti[agentiPresenti.length - 1];

    const cognome =
      ultimo.querySelector(".cognomeAgente").value.trim();

    const nome =
      ultimo.querySelector(".nomeAgente").value.trim();

    const cid =
      ultimo.querySelector(".cidAgente").value.trim();

    const turno =
      ultimo.querySelector(".turno").value;

    if (
      cognome === "" ||
      nome === "" ||
      cid === "" ||
      turno === ""
    ) {

      alert(
        "Completa Cognome, Nome, CID e Turno dell'ultimo agente prima di aggiungerne un altro."
      );

      return;
    }

  }

  const contenitore =
    document.getElementById("contenitoreAgenti");

  const blocco =
    document.createElement("div");

  blocco.className = "blocco-agente";

  if (richiedente) {
    blocco.id = "agenteRichiedente";
  }

  blocco.innerHTML = `

    <hr>

    <h3>
      ${richiedente ? "Richiedente" : "Agente"}
    </h3>

    <label>Cognome</label>
    <input class="cognomeAgente">

    <label>Nome</label>
    <input class="nomeAgente" readonly>

    <label>CID</label>
    <input class="cidAgente" readonly>

    <label>Turno</label>

    <select class="turno">

      <option value="">
        Seleziona turno
      </option>

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

    <label><input type="checkbox" class="chrep"> ChRep</label>
    <label><input type="checkbox" class="chdisp"> ChDisp</label>
    <label><input type="checkbox" class="trasferta"> Trasferta</label>
    <label><input type="checkbox" class="linea"> Linea</label>

    <br>

    <label><input type="checkbox" class="galleria"> Galleria</label>
    <label><input type="checkbox" class="sostnocive"> Sost. Nocive</label>
    <label><input type="checkbox" class="scorta"> Scorta</label>
    <label><input type="checkbox" class="ti"> TI</label>

    <br><br>

    ${richiedente ? "" : `
      <button type="button" class="btnElimina">
        Elimina
      </button>
    `}

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

  const btnElimina =
    blocco.querySelector(".btnElimina");

  if (btnElimina) {

    btnElimina.addEventListener("click", () => {
      blocco.remove();
    });

  }

}

function generaRiepilogo() {

  const note =
    document.getElementById("note").value.trim();

  const agentiInseriti =
    document.querySelectorAll(".blocco-agente");

  if (agentiInseriti.length === 0) {

    alert(
      "Inserire almeno un agente."
    );

    return;
  }

  if (note === "") {

    alert(
      "Compilare il campo Note."
    );

    return;
  }

  let html = `

    <hr>

    <h2>Riepilogo</h2>

    <p>
      <strong>Data di riferimento:</strong>
      ${document.getElementById("dataRiferimento").value}
    </p>

    <p>
      <strong>Richiedente:</strong>
      ${document.getElementById("cognomeRichiedente").value}
      ${document.getElementById("nomeRichiedente").value}
    </p>

    <h3>Agenti</h3>

  `;

  for (const agente of agentiInseriti) {

    const cognome =
      agente.querySelector(".cognomeAgente").value;

    const nome =
      agente.querySelector(".nomeAgente").value;

    const cid =
      agente.querySelector(".cidAgente").value;

    const turno =
      agente.querySelector(".turno").value;

    if (turno === "") {

      alert(
        "Tutti gli agenti devono avere un turno."
      );

      return;
    }

    html += `

      <div>

        <strong>${cognome} ${nome}</strong>

        <br>

        CID: ${cid}

        <br>

        Turno: ${turno}

      </div>

      <br>

    `;

  }

  html += `

    <h3>Note</h3>

    <p>${note}</p>

  `;

  document
    .getElementById("riepilogo")
    .innerHTML = html;

  const azioni =
    document.getElementById("azioniFinali");

  if (azioni) {
    azioni.style.display = "block";
  }

}
