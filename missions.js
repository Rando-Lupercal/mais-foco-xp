/* =======================================================
   MAIS FOCO XP
   MISSIONS.JS
====================================================== */

const MissionSystem = {

    missoes: [

        {
            id: 1,
            titulo: "Criar campanha Instagram",
            descricao: "Produzir campanha para redes sociais.",
            xp: 300,
            status: "todo"
        },

        {
            id: 2,
            titulo: "Participar da reunião",
            descricao: "Reunião semanal da equipe.",
            xp: 100,
            status: "doing"
        },

        {
            id: 3,
            titulo: "Finalizar relatório",
            descricao: "Entrega mensal.",
            xp: 250,
            status: "done"
        }

    ]

};

/* =======================================================
   INICIAR
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

    carregarMissoes();

    configurarDropzones();

});

/* =======================================================
   KANBAN
======================================================= */

function carregarMissoes(){

    const todo = document.getElementById("todo");
    const doing = document.getElementById("doing");
    const done = document.getElementById("done");

    if(!todo || !doing || !done) return;

    todo.innerHTML = "";
    doing.innerHTML = "";
    done.innerHTML = "";

    MissionSystem.missoes.forEach(missao => {

        const card = document.createElement("div");
        card.className = "kanban-card";
        card.draggable = true;
        card.dataset.id = missao.id;
        card.innerHTML = `
            <h4>${missao.titulo}</h4>
            <p>${missao.descricao}</p>
            <span>⭐ ${missao.xp} XP</span>
        `;

        card.addEventListener("dragstart", dragStart);

        if(missao.status === "todo"){
            todo.appendChild(card);
        } else if(missao.status === "doing"){
            doing.appendChild(card);
        } else if(missao.status === "done"){
            done.appendChild(card);
        }

    });

}

/* =======================================================
   DRAG
======================================================= */

let missionDragged = null;

function dragStart(e){
    missionDragged = e.target;
}

/* =======================================================
   DROP
======================================================= */

function configurarDropzones(){

    document.querySelectorAll(".dropzone").forEach(zone => {

        zone.addEventListener("dragover", e => {
            e.preventDefault();
        });

        zone.addEventListener("drop", e => {
            e.preventDefault();
            if(!missionDragged) return;
            zone.appendChild(missionDragged);
            atualizarStatus(missionDragged.dataset.id, zone.id);
        });

    });

}

/* =======================================================
   STATUS
======================================================= */

function atualizarStatus(id, status){

    const missao = MissionSystem.missoes.find(m => m.id == id);
    if(!missao) return;

    const estavaDone = missao.status === "done";
    missao.status = status;

    if(status === "done" && !estavaDone){
        adicionarXP(missao.xp);
        mostrarToast("🏆 Missão concluída");
    }

}
