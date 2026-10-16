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

    const contenitore =
    document.getElementById("contenitoreAgenti");

if (contenitore.children.length === 0) {

    aggiungiAgente();

    const primoAgente =
        contenitore.querySelector(".blocco-agente");

    primoAgente
        .querySelector(".cognomeAgente")
        .value = agente.cognome;

    primoAgente
        .querySelector(".nomeAgente")
        .value = agente.nome;

    primoAgente
        .querySelector(".cidAgente")
        .value = agente.cid;
}

}

function aggiungiAgente() {

    const contenitore =
        document.getElementById("contenitoreAgenti");

    const div = document.createElement("div");

    div.className = "blocco-agente";

    div.innerHTML = `

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

        <button type="button"
            onclick="this.parentElement.remove()">
            Elimina
        </button>

    `;

    contenitore.appendChild(div);

    const cognomeInput =
        div.querySelector(".cognomeAgente");

    cognomeInput.addEventListener("input", () => {

        const cognome =
            cognomeInput.value.toUpperCase();

        const agente =
            agenti.find(
                a => a.cognome === cognome
            );

        if (!agente) return;

        div.querySelector(".nomeAgente").value =
            agente.nome;

        div.querySelector(".cidAgente").value =
            agente.cid;

    });

}

    contenitore.appendChild(div);

}
