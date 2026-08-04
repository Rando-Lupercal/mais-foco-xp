/* ======================================================
   MAIS FOCO XP
   APP.JS
   Controle geral da interface
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarSistema();

});

function iniciarSistema(){

    configurarSidebar();

    configurarNotificacoes();

    configurarAnimacoes();

    configurarTema();

    configurarAvatar();

    configurarScroll();

}

/* ======================================================
   SIDEBAR
====================================================== */

function configurarSidebar(){

    const links = document.querySelectorAll(".menu li");

    links.forEach(link=>{

        link.addEventListener("click",()=>{

            links.forEach(item=>item.classList.remove("active"));

            link.classList.add("active");

        });

    });

}

/* ======================================================
   SCROLL SUAVE
====================================================== */

function configurarScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const destino=document.querySelector(this.getAttribute("href"));

            if(destino){

                destino.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

}

/* ======================================================
   MODAL DE NOTIFICAÇÕES
====================================================== */

function configurarNotificacoes(){

    const botao=document.querySelector(".notification");

    const modal=document.getElementById("notificationModal");

    const fechar=document.querySelector(".close-modal");

    if(!botao || !modal) return;

    botao.addEventListener("click",()=>{

        modal.style.display="flex";

    });

    fechar.addEventListener("click",()=>{

        modal.style.display="none";

    });

    window.addEventListener("click",(e)=>{

        if(e.target===modal){

            modal.style.display="none";

        }

    });

}

/* ======================================================
   ANIMAÇÕES
====================================================== */

function configurarAnimacoes(){

    const elementos=document.querySelectorAll(".card,.panel");

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.1

    });

    elementos.forEach(el=>observer.observe(el));

}

/* ======================================================
   TEMA
====================================================== */

function configurarTema(){

    const temaSalvo=localStorage.getItem("tema");

    if(temaSalvo==="dark"){

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

    aplicarDarkMode();

}

function configurarAvatar(){

    const avatarInput=document.getElementById("avatarInput");

    const changeButton=document.querySelector(".avatar-change-btn");

    const resetButton=document.querySelector(".avatar-reset-btn");

    if(!avatarInput || !changeButton || !resetButton) return;

    changeButton.addEventListener("click",()=>{

        avatarInput.click();

    });

    avatarInput.addEventListener("change",event=>{

        const file=event.target.files?.[0];

        if(!file) return;

        if(!file.type.startsWith("image/")){

            mostrarToast("Selecione um arquivo de imagem válido.");

            return;

        }

        const reader=new FileReader();

        reader.onload=()=>{

            const avatarSrc=reader.result;

            if(avatarSrc){

                localStorage.setItem("userAvatar",avatarSrc.toString());

                atualizarAvatar(avatarSrc.toString());

                mostrarToast("Avatar alterado com sucesso!");

            }

        };

        reader.readAsDataURL(file);

    });

    resetButton.addEventListener("click",()=>{

        localStorage.removeItem("userAvatar");

        atualizarAvatar("assets/avatars/default.svg");

        mostrarToast("Avatar restaurado ao padrão.");

    });

    carregarAvatar();

}

function atualizarAvatar(src){

    document.querySelectorAll(".user img, .profile-avatar").forEach(img=>{

        if(img) img.src=src;

    });

}

function carregarAvatar(){

    const avatarSalvo=localStorage.getItem("userAvatar")||"assets/avatars/default.svg";

    atualizarAvatar(avatarSalvo);

}

/* ======================================================
   ALTERAR TEMA
====================================================== */

function alternarTema(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("tema","dark");

    }else{

        localStorage.setItem("tema","light");

    }

    aplicarDarkMode();

}

/* ======================================================
   TEMA ESCURO
====================================================== */

function aplicarDarkMode(){

    if(document.body.classList.contains("dark")){

        document.documentElement.style.setProperty("--bg","#0F172A");

        document.documentElement.style.setProperty("--surface","#111827");

        document.documentElement.style.setProperty("--text","#F8FAFC");

        document.documentElement.style.setProperty("--text-light","#CBD5E1");

        document.documentElement.style.setProperty("--border","#334155");

        document.documentElement.style.setProperty("--shadow","0 12px 30px rgba(0,0,0,.35)");

    } else {

        document.documentElement.style.setProperty("--bg","#F8FAFC");

        document.documentElement.style.setProperty("--surface","#FFFFFF");

        document.documentElement.style.setProperty("--text","#0F172A");

        document.documentElement.style.setProperty("--text-light","#64748B");

        document.documentElement.style.setProperty("--border","#E2E8F0");

        document.documentElement.style.setProperty("--shadow","0 12px 30px rgba(0,0,0,.08)");

    }

}

/* ======================================================
   TOAST
====================================================== */

function mostrarToast(mensagem){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=mensagem;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

}
/* ======================================================
   APP.JS - PARTE 2
   Recursos avançados da interface
====================================================== */

/* ======================================================
   CONTADORES ANIMADOS
====================================================== */

function animarContadores(){

    const contadores = document.querySelectorAll(".card h2");

    contadores.forEach(contador=>{

        const texto = contador.innerText.replace(/\D/g,"");

        const alvo = parseInt(texto);

        if(isNaN(alvo)) return;

        let atual = 0;

        const incremento = Math.max(1,Math.floor(alvo/80));

        const timer = setInterval(()=>{

            atual += incremento;

            if(atual >= alvo){

                atual = alvo;
                clearInterval(timer);

            }

            contador.innerText = atual.toLocaleString("pt-BR");

        },20);

    });

}

/* ======================================================
   BARRA XP
====================================================== */

function atualizarBarraXP(atual,maximo){

    const barra=document.querySelector(".progress-fill");

    if(!barra) return;

    let porcentagem=(atual/maximo)*100;

    porcentagem=Math.min(100,Math.max(0,porcentagem));

    barra.style.width=porcentagem+"%";

}

/* ======================================================
   BADGE
====================================================== */

function atualizarBadge(valor){

    const badge=document.querySelector(".badge");

    if(!badge) return;

    badge.innerText=valor;

    badge.style.display=valor>0?"flex":"none";

}

/* ======================================================
   DARK MODE
====================================================== */

function criarBotaoTema(){

    const topbar=document.querySelector(".top-actions");

    if(!topbar) return;

    const botao=document.createElement("button");

    botao.className="notification";

    botao.innerHTML='<i class="bi bi-moon-fill"></i>';

    botao.onclick=()=>{

        alternarTema();

    };

    topbar.prepend(botao);

}

/* ======================================================
   TOOLTIPS
====================================================== */

function iniciarTooltips(){

    document.querySelectorAll("[data-tooltip]").forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            const dica=document.createElement("div");

            dica.className="tooltip";

            dica.innerText=item.dataset.tooltip;

            document.body.appendChild(dica);

            const rect=item.getBoundingClientRect();

            dica.style.left=rect.left+"px";

            dica.style.top=(rect.top-40)+"px";

            item.tooltip=dica;

        });

        item.addEventListener("mouseleave",()=>{

            if(item.tooltip){

                item.tooltip.remove();

            }

        });

    });

}

/* ======================================================
   ATALHOS
====================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="k"){

        e.preventDefault();

        mostrarToast("🔍 Pesquisa rápida (em desenvolvimento)");

    }

    if(e.ctrlKey && e.key==="m"){

        e.preventDefault();

        alternarTema();

    }

});

/* ======================================================
   LOADING
====================================================== */

function esconderLoading(){

    const loader=document.getElementById("loading");

    if(loader){

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.remove();

        },400);

    }

}

/* ======================================================
   DEMONSTRAÇÃO
====================================================== */

window.addEventListener("load",()=>{

    animarContadores();

    atualizarBarraXP(2450,3000);

    atualizarBadge(3);

    criarBotaoTema();

    aplicarDarkMode();

    iniciarTooltips();

    esconderLoading();

});