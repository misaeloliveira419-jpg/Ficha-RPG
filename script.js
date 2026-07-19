const atributos = document.querySelectorAll(".quadrado");

atributos.forEach(input => {

    input.addEventListener("input", () => {

        let valor = Number(input.value);

        if (valor > 5) input.value = 5;
        if (valor < 0) input.value = 0;

        atualizarFicha();

    });

});

const barras = document.querySelectorAll(".status");

barras.forEach(status=>{

    const atual = status.querySelector(".atual");
    const maximo = status.querySelector(".maximo");
    const barra = status.querySelector(".preenchimento");

    function atualizar(){

        let a = Number(atual.value);
        let m = Number(maximo.value);

        if(m <= 0) m = 1;
        if(a < 0) a = 0;

        atual.value = a;
        maximo.value = m;

        barra.style.width = (a/m*100)+"%";
    }

    atualizar();

    atual.addEventListener("input", atualizar);
    maximo.addEventListener("input", atualizar);

});

const lista = document.getElementById("lista-habilidades");
const botao = document.getElementById("adicionar-habilidade");

let banco = {
    atual: null,
    fichas: []
};

function criarHabilidade(){

    const card = document.createElement("div");
    card.className = "card-habilidade";

    card.innerHTML = `
        <div class="topo-habilidade">

            <input class="nome-habilidade" placeholder="Nova habilidade">

            <div class="botoes">

                <button class="btn abrir">▶</button>

                <button class="btn apagar">🗑</button>

            </div>

        </div>

        <div class="conteudo">

            <label>Descrição</label>
            <textarea></textarea>

            <label>Custo</label>
            <input type="text">

            <label>Dano</label>
            <input type="text">

            <label>Alcance</label>
            <input type="text">

            <label>Efeito</label>
            <textarea></textarea>

        </div>
    `;

    const abrir = card.querySelector(".abrir");
    const apagar = card.querySelector(".apagar");
    const conteudo = card.querySelector(".conteudo");

    abrir.onclick = ()=>{

        if(conteudo.style.display==="block"){

            conteudo.style.display="none";
            abrir.textContent="▶";

        }else{

            conteudo.style.display="block";
            abrir.textContent="▼";

        }

    };

    apagar.onclick = ()=>{

        if(confirm("Deseja apagar esta habilidade?")){

            card.remove();

        }

    };

    lista.appendChild(card);

}

botao.onclick = criarHabilidade;

criarHabilidade();
criarHabilidade();
criarHabilidade();

const listaItens = document.getElementById("lista-itens");
const botaoAdicionarItem = document.getElementById("adicionar-item");

function criarItem(){

    const card = document.createElement("div");
    card.className = "card-item";

    card.innerHTML = `
        <div class="topo-item">

            <input class="nome-item" placeholder="Novo item">

            <div class="botoes-item">

                <button class="btn abrir-item">▶</button>

                <button class="btn apagar-item">🗑</button>

            </div>

        </div>

        <div class="conteudo-item">

            <label>Descrição</label>

            <textarea placeholder="Descrição do item"></textarea>

        </div>
    `;

    const abrir = card.querySelector(".abrir-item");
    const apagar = card.querySelector(".apagar-item");
    const conteudo = card.querySelector(".conteudo-item");

    abrir.onclick = () => {

        if (conteudo.style.display === "block"){

            conteudo.style.display = "none";
            abrir.textContent = "▶";

        }else{

            conteudo.style.display = "block";
            abrir.textContent = "▼";

        }

    };

    apagar.onclick = () => {

        if(confirm("Deseja apagar este item?")){

            card.remove();

        }

    };

    listaItens.appendChild(card);

}

botaoAdicionarItem.onclick = criarItem;

criarItem();
criarItem();
criarItem();

const botoesSecao = document.querySelectorAll(".btn-secao");

botoesSecao.forEach(botao=>{

    const conteudo = botao
        .closest(".bloco")
        .querySelector(".conteudo-secao");

    botao.onclick=()=>{

        conteudo.classList.toggle("fechado");

        botao.textContent=
            conteudo.classList.contains("fechado")
            ? "▶"
            : "▼";

    };

});

const listaAtributos = [
    {texto:"DES", classe:"des"},
    {texto:"FOR", classe:"for"},
    {texto:"INT", classe:"int"},
    {texto:"PRE", classe:"pre"},
    {texto:"VIG", classe:"vig"}
];

document.querySelectorAll(".atributo-pericia").forEach(span=>{

    span.addEventListener("click",()=>{

        let indice = listaAtributos.findIndex(a =>
            span.classList.contains(a.classe)
        );

        indice = (indice + 1) % listaAtributos.length;

        span.classList.remove("des","for","int","pre","vig");

        span.classList.add(listaAtributos[indice].classe);

        span.textContent = "(" + listaAtributos[indice].texto + ")";

    });

});

const opcoesTreinamento = [
    "-5",
    "0",
    "+1d6",
    "+2d6",
    "+3d6"
];

const menu = document.createElement("div");
menu.className = "menu-treinamento";

opcoesTreinamento.forEach(valor=>{

    const opcao = document.createElement("div");

    opcao.className = "menu-opcao";

    opcao.textContent = valor;

    menu.appendChild(opcao);

});

document.body.appendChild(menu);

let botaoAtual = null;

document.querySelectorAll(".treinamento").forEach(botao=>{

    botao.addEventListener("click",(e)=>{

        e.stopPropagation();

        botaoAtual = botao;

        menu.style.display = "block";

        menu.style.left = e.clientX + 8 + "px";

        menu.style.top = e.clientY + "px";

    });

});

menu.querySelectorAll(".menu-opcao").forEach(opcao=>{

    opcao.addEventListener("click",()=>{

        if(botaoAtual){

            botaoAtual.textContent = opcao.textContent;

            atualizarFicha();
        }

        menu.style.display = "none";

    });

});

document.addEventListener("click",()=>{

    menu.style.display = "none";

});

function atualizarStatus(barra, novoMaximo){
    const atual = barra.querySelector(".atual");
    const maximo = barra.querySelector(".maximo");

    const diferenca = Number(maximo.value) - Number(atual.value);

    maximo.value = novoMaximo;
    atual.value = Math.max(0, novoMaximo - diferenca);

    maximo.dispatchEvent(new Event("input"));
}

function atualizarVida(){

    const vigor = Number(document.querySelectorAll(".quadrado")[4].value);

    const fortitude = document.querySelectorAll(".treinamento")[9].textContent;

    const tabela = {
        "-5": -1,
        "0": 0,
        "+1d6": 1,
        "+2d6": 2,
        "+3d6": 3
    };

    const bonus = tabela[fortitude] ?? 0;

    const maxVida = 10 + vigor + bonus * 2;

    atualizarStatus(
        document.querySelectorAll(".status")[0],
        maxVida
    );
}

function atualizarSanidade(){

    const intelecto = Number(document.querySelectorAll(".quadrado")[2].value);

    const vontade = document.querySelectorAll(".pericia")[23]
        .querySelector(".treinamento").textContent;

    const bonusSanidade = {
        "-5": -1,
        "0": 0,
        "+1d6": 1,
        "+2d6": 2,
        "+3d6": 3
    }[vontade] || 0;

    const maxSanidade = 20 + 3 * intelecto + bonusSanidade * 2;

    atualizarStatus(
        document.querySelectorAll(".status")[1],
        maxSanidade
    );
}

function atualizarEsforco(){

    const presenca = Number(document.querySelectorAll(".quadrado")[3].value);

    const maxEsforco = 15 + 3 * presenca;

    atualizarStatus(
        document.querySelectorAll(".status")[2],
        maxEsforco
    );
}

function atualizarFicha() {

    atualizarVida();
    atualizarSanidade();
    atualizarEsforco();
}

atualizarFicha();

document.querySelectorAll(".maximo").forEach(input=>{
    input.dispatchEvent(new Event("input"));
});

function criarFichaNova(){

    const ficha = {

        id: Date.now(),

        jogador: "",

        personagem: "Nova Ficha " + (banco.fichas.length + 1),

        atributos:[1,1,1,1,1],

        status:[
            {atual:11,maximo:11},
            {atual:23,maximo:23},
            {atual:18,maximo:18}
        ],

        pericias:[],

        habilidades:[],

        inventario:[]
    };

    document.querySelectorAll(".pericia").forEach(p=>{

        ficha.pericias.push({

            atributo:p.querySelector(".atributo-pericia").textContent,

            classe:p.querySelector(".atributo-pericia").className,

            treinamento:p.querySelector(".treinamento").textContent,

            modificador:""

        });

    });

    banco.fichas.push(ficha);

    banco.atual = ficha.id;

    salvarBanco();

}

function salvarBanco(){

    localStorage.setItem(
        "BancoFichasRPG",
        JSON.stringify(banco)
    );

}

function carregarBanco(){

    const salvo = localStorage.getItem("BancoFichasRPG");

    if(salvo){

        banco = JSON.parse(salvo);

    }

    if(banco.fichas.length===0){

        criarFichaNova();

    }

    atualizarBotaoExcluir();
}

function fichaAtual(){

    return banco.fichas.find(f=>f.id===banco.atual);

}

function salvarFichaAtual(){

    const ficha = fichaAtual();

    ficha.jogador =
        document.getElementById("jogador").value;

    ficha.personagem =
        document.getElementById("personagem").value;

    ficha.atributos =
        [...document.querySelectorAll(".quadrado")]
        .map(x=>Number(x.value));

    ficha.status =
        [...document.querySelectorAll(".status")]
        .map(s=>({

            atual:Number(s.querySelector(".atual").value),

            maximo:Number(s.querySelector(".maximo").value)

        }));

    ficha.pericias =
        [...document.querySelectorAll(".pericia")]
        .map(p=>({

            atributo:p.querySelector(".atributo-pericia").textContent,

            classe:p.querySelector(".atributo-pericia").className,

            treinamento:p.querySelector(".treinamento").textContent,

            modificador:p.querySelector(".modificador").value

        }));

    salvarBanco();
    
    atualizarBotaoExcluir();

}

function carregarFichaAtual(){

    const ficha = fichaAtual();

    document.getElementById("jogador").value =
        ficha.jogador;

    document.getElementById("personagem").value =
        ficha.personagem;

    document.querySelectorAll(".quadrado")
    .forEach((q,i)=>{

        q.value=ficha.atributos[i];

    });

    document.querySelectorAll(".status")
    .forEach((s,i)=>{

        s.querySelector(".atual").value =
            ficha.status[i].atual;

        s.querySelector(".maximo").value =
            ficha.status[i].maximo;

        s.querySelector(".maximo")
        .dispatchEvent(new Event("input"));

    });

    document.querySelectorAll(".pericia")
    .forEach((p,i)=>{

        const dados=ficha.pericias[i];

        const atributo =
            p.querySelector(".atributo-pericia");

        atributo.textContent=dados.atributo;

        atributo.className=dados.classe;

        p.querySelector(".treinamento")
        .textContent=dados.treinamento;

        p.querySelector(".modificador")
        .value=dados.modificador;

    });

    atualizarFicha();

}

carregarBanco();

carregarFichaAtual();

document.addEventListener("input",()=>{

    salvarFichaAtual();

});

document.addEventListener("click",()=>{

    setTimeout(salvarFichaAtual,20);

});

const btnMenu = document.getElementById("btn-menu");

const menuLateral = document.getElementById("menu-lateral");

btnMenu.onclick = (e)=>{

    e.stopPropagation();

    if(menuLateral.style.display==="flex"){

        menuLateral.style.display="none";

    }else{

        menuLateral.style.display="flex";

    }

};

document.addEventListener("click",()=>{

    menuLateral.style.display="none";

});

menuLateral.addEventListener("click",(e)=>{

    e.stopPropagation();

});

document
.getElementById("criar-ficha")
.onclick = ()=>{

    salvarFichaAtual();

    criarFichaNova();

    carregarFichaAtual();

    menuLateral.style.display = "none";

};

function atualizarBotaoExcluir(){

    const botao =
        document.getElementById("deletar-ficha");

    botao.disabled =
        banco.fichas.length<=1;

}

document
.getElementById("deletar-ficha")
.onclick=()=>{

    if(banco.fichas.length<=1)
        return;

    if(!confirm("Deseja apagar esta ficha?"))
        return;

    const indice =
        banco.fichas.findIndex(
            f=>f.id===banco.atual
        );

    banco.fichas.splice(indice,1);

    banco.atual =
        banco.fichas[0].id;

    salvarBanco();

    carregarFichaAtual();

    atualizarBotaoExcluir();

};

function atualizarListaFichas(){

    const lista = document.getElementById("lista-fichas");

    lista.innerHTML = "";

    banco.fichas.forEach((ficha, indice)=>{

        const div = document.createElement("div");

        div.className = "ficha-lista";

        div.innerHTML = `
            <span class="nome-ficha">
                ${ficha.personagem || "Sem nome"}
            </span>

            <button class="excluir-ficha">🗑</button>
        `;
        
        div.querySelector(".nome-ficha").onclick = ()=>{

            banco.atual = ficha.id;

            salvarBanco();

            carregarFichaAtual();

            fecharListaFichas();

        };
        
        div.querySelector(".excluir-ficha").onclick = (e)=>{

            e.stopPropagation();

            if(banco.fichas.length <= 1){
                return;
            }

            if(!confirm("Deseja apagar esta ficha?")){
                return;
            }

            banco.fichas.splice(indice,1);

            if(banco.atual === ficha.id){

                banco.atual = banco.fichas[0].id;

            }

            salvarBanco();

            atualizarListaFichas();

            atualizarBotaoExcluir();

        };

        lista.appendChild(div);

    });

}

function abrirListaFichas(){

    salvarFichaAtual();

    atualizarListaFichas();
    
    document.querySelector("header").style.display = "none";

    document.querySelector("main").style.display="none";

    document.getElementById("tela-fichas")
        .style.display="block";

}

function fecharListaFichas(){
    
    document.querySelector("header").style.display = "block";

    document.querySelector("main").style.display="grid";

    document.getElementById("tela-fichas")
        .style.display="none";

}

document
.getElementById("abrir-lista")
.onclick=()=>{

    menuLateral.style.display="none";

    abrirListaFichas();

};

document
.getElementById("voltar-ficha")
.onclick=()=>{

    fecharListaFichas();

};

document
.getElementById("nova-ficha-lista")
.onclick = ()=>{

    criarFichaNova();

    carregarFichaAtual();

    fecharListaFichas();

};

