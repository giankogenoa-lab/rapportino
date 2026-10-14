let agenti = [];

fetch("agenti.json")
.then(r => r.json())
.then(dati => {
    agenti = dati;
});

document
.getElementById("cognomeRichiedente")
.addEventListener("change", trovaRichiedente);

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

    if(!agente)
        return;

    document
      .getElementById("nomeRichiedente")
      .value = agente.nome;

    document
      .getElementById("cidRichiedente")
      .value = agente.cid;
}
