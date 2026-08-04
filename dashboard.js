/* =======================================================
   MAIS FOCO XP
   DASHBOARD.JS
======================================================= */

const Dashboard = {

    usuario:{

        nome:"Albert Santos",

        xp:2450,

        nivel:12,

        cargo:"Especialista",

        streak:8,

        missoes:31,

        concluidas:28

    },

    ranking:[

        {
            nome:"Albert",
            xp:2450
        },

        {
            nome:"Maria",
            xp:2280
        },

        {
            nome:"João",
            xp:2100
        },

        {
            nome:"Pedro",
            xp:1900
        }

    ]

};

/* =======================================================
   INICIAR
======================================================= */

document.addEventListener("DOMContentLoaded",()=>{

    iniciarDashboard();

});

/* =======================================================
   DASHBOARD
======================================================= */

function iniciarDashboard(){

    atualizarUsuario();

    atualizarCards();

    atualizarRanking();

    criarGrafico();

}

/* =======================================================
   USUÁRIO
======================================================= */

function atualizarUsuario(){

    document.querySelector(".user strong").innerText=

        Dashboard.usuario.nome;

    document.querySelector(".user span").innerText=

        Dashboard.usuario.cargo+" • Nível "+Dashboard.usuario.nivel;

}

/* =======================================================
   CARDS
======================================================= */

function atualizarCards(){

    const cards=document.querySelectorAll(".card h2");

    if(cards.length<4) return;

    cards[0].innerText=Dashboard.usuario.xp;

    cards[1].innerText=Dashboard.usuario.nivel;

    cards[2].innerText=Dashboard.usuario.missoes;

    cards[3].innerText=Dashboard.usuario.streak+" dias";

}

/* =======================================================
   RANKING
======================================================= */

function atualizarRanking(){

    const lista=document.querySelector(".ranking");

    if(!lista) return;

    lista.innerHTML="";

    Dashboard.ranking

        .sort((a,b)=>b.xp-a.xp)

        .forEach((usuario,index)=>{

            let medalha="";

            if(index===0) medalha="🥇";

            else if(index===1) medalha="🥈";

            else if(index===2) medalha="🥉";

            else medalha=(index+1)+"º";

            lista.innerHTML+=`

            <div class="ranking-item">

                <span>${medalha} ${usuario.nome}</span>

                <strong>${usuario.xp} XP</strong>

            </div>

            `;

        });

}

/* =======================================================
   CHARTS
======================================================= */

function criarGrafico(){

    criarGraficoXP();

    criarGraficoMissoes();

}

/* =======================================================
   XP
======================================================= */

function criarGraficoXP(){

    const canvas=document.getElementById("xpChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"line",

        data:{

            labels:[
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago"
            ],

            datasets:[{

                label:"XP",

                data:[
                    150,
                    380,
                    650,
                    980,
                    1400,
                    1750,
                    2100,
                    2450
                ],

                borderColor:"#7C3AED",

                backgroundColor:"rgba(124,58,237,.15)",

                borderWidth:4,

                fill:true,

                tension:.4,

                pointRadius:5

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                y:{
                    beginAtZero:true
                }

            }

        }

    });

}

/* =======================================================
   MISSÕES
======================================================= */

function criarGraficoMissoes(){

    const canvas=document.getElementById("missionChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:[

                "Concluídas",

                "Pendentes",

                "Em andamento"

            ],

            datasets:[{

                data:[

                    28,

                    2,

                    1

                ],

                backgroundColor:[

                    "#22C55E",

                    "#F59E0B",

                    "#7C3AED"

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}

/* =======================================================
   XP
======================================================= */

function adicionarXP(valor){

    Dashboard.usuario.xp += valor;

    const xpParaSubir = 3000;

    while(Dashboard.usuario.xp >= xpParaSubir){

        Dashboard.usuario.xp -= xpParaSubir;

        subirNivel();

    }

    atualizarCards();

}

/* =======================================================
   NÍVEL
======================================================= */

function subirNivel(){

    Dashboard.usuario.nivel++;

    mostrarToast("🎉 Você subiu de nível!");

}

/* =======================================================
   MISSÃO
======================================================= */

function concluirMissao(xp){

    Dashboard.usuario.concluidas++;

    Dashboard.usuario.missoes--;

    adicionarXP(xp);

}

/* =======================================================
   ATUALIZAÇÃO
======================================================= */

setInterval(()=>{

    atualizarCards();

},5000);