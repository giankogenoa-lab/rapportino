let agenti = [];

fetch("agenti.json")
    .then(response => response.json())
    .then(data => {

        agenti = data;

        caricaListaAgenti();

    });

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("cognomeRichiedente")
        .addEventListener("input", trovaRichiedente);

    document
        .getElementById("aggiungiAgente")
        .addEventListener("click", () => aggiungiAgente(false));

    document
        .getElementById("rivedi")
        .addEventListener("click", generaRiepilogo);

    document
        .getElementById("modifica")
        .addEventListener("click", tornaModifica);

});

function caricaListaAgenti() {

    const lista =
        document.getElementById("listaAgenti");

    lista.innerHTML = "";

    agenti.forEach(a => {

        const option =
            document.createElement("option");

        option.value = a.cognome;

        lista.appendChild(option);

    });

}

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

    document.getElementById("nomeRichiedente").value =
        agente.nome;

    document.getElementById("cidRichiedente").value =
        agente.cid;

    if (!document.getElementById("agenteRichiedente")) {

        aggiungiAgente(true);

        const primo =
            document.getElementById("agenteRichiedente");

        primo.querySelector(".ricercaAgente").value =
            agente.cognome;

        primo.querySelector(".nomeAgente").value =
            agente.nome;

        primo.querySelector(".cidAgente").value =
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
            ultimo.querySelector(".ricercaAgente").value.trim();

        const nome =
            ultimo.querySelector(".nomeAgente").value.trim();

        const cid =
            ultimo.querySelector(".cidAgente").value.trim();

        const turno =
            ultimo.querySelector(".turno").value.trim();

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

        <label>Agente</label>

        <input
            class="ricercaAgente"
            list="listaAgenti">

        <label>Nome</label>
        <input
            class="nomeAgente"
            readonly>

        <label>CID</label>
        <input
            class="cidAgente"
            readonly>

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

        ${richiedente ? "" : `
            <br><br>
            <button type="button" class="btnElimina">
                Elimina
            </button>
        `}

        <hr>

    `;

    contenitore.appendChild(blocco);

    const ricerca =
        blocco.querySelector(".ricercaAgente");

    ricerca.addEventListener("input", () => {

        const cognome =
            ricerca.value.toUpperCase();

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

    const elimina =
        blocco.querySelector(".btnElimina");

    if (elimina) {

        elimina.addEventListener("click", () => {
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

        alert("Inserire almeno un agente.");

        return;
    }

    if (note === "") {

        alert("Compilare il campo Note.");

        return;
    }

    let html = `

        <h2>Dati Generali</h2>

        <p>
            <strong>Data riferimento:</strong>
            ${document.getElementById("dataRiferimento").value}
        </p>

        <h2>Agenti</h2>

    `;

    for (const agente of agentiInseriti) {

        const cognome =
            agente.querySelector(".ricercaAgente").value;

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

            <div class="blocco-agente">

                <strong>${cognome}</strong>

                <br>

                Nome: ${nome}

                <br>

                CID: ${cid}

                <br>

                Turno: ${turno}

            </div>

            <br>

        `;
    }

    html += `

        <h2>Note</h2>

        <p>${note}</p>

    `;

    document
        .getElementById("contenutoRiepilogo")
        .innerHTML = html;

    document
        .getElementById("paginaInserimento")
        .classList.add("nascosto");

    document
        .getElementById("paginaRiepilogo")
        .classList.remove("nascosto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function tornaModifica() {

    document
        .getElementById("paginaRiepilogo")
        .classList.add("nascosto");

    document
        .getElementById("paginaInserimento")
        .classList.remove("nascosto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
