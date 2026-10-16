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

    if (!agente) return;

    document
        .getElementById("nomeRichiedente")
        .value = agente.nome;

    document
        .getElementById("cidRichiedente")
        .value = agente.cid;

}

function aggiungiAgente() {

    const contenitore =
        document.getElementById("contenitoreAgenti");

    const div = document.createElement("div");

    div.className = "blocco-agente";

    div.innerHTML = `

        <h3>Agente</h3>

        <label>Cognome</label>
        <input class="cognomeAgente">

        <label>Nome</label>
        <input class="nomeAgente" readonly>

        <label>CID</label>
        <input class="cidAgente" readonly>

        <label>Turno</label>
        <select>

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
        <input>

        <br><br>

        <label><input type="checkbox"> ChRep</label>
        <label><input type="checkbox"> ChDisp</label>
        <label><input type="checkbox"> Trasferta</label>
        <label><input type="checkbox"> Linea</label>

        <br>

        <label><input type="checkbox"> Galleria</label>
        <label><input type="checkbox"> Sost. Nocive</label>
        <label><input type="checkbox"> Scorta</label>
        <label><input type="checkbox"> TI</label>

        <br><br>

        <button type="button"
            onclick="this.parentElement.remove()">

            Elimina

        </button>

        <hr>

    `;

    contenitore.appendChild(div);

}
