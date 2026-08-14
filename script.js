let carregandoFicha = false;

const PERICIAS_PADRAO = [
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Acrobacia
    { atributo: "(PRE)", classe: "atributo-pericia pre", treinamento: 1, modificador: "" }, // Adestramento
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Atletismo
    { atributo: "(INT)", classe: "atributo-pericia int", treinamento: 1, modificador: "" }, // Atualidades
    { atributo: "(INT)", classe: "atributo-pericia int", treinamento: 1, modificador: "" }, // Ciências
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Condução
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Crime
    { atributo: "(PRE)", classe: "atributo-pericia pre", treinamento: 1, modificador: "" }, // Diplomacia
    { atributo: "(PRE)", classe: "atributo-pericia pre", treinamento: 1, modificador: "" }, // Enganação
    { atributo: "(VIG)", classe: "atributo-pericia vig", treinamento: 1, modificador: "" }, // Fortitude
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Furtividade
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Iniciativa
    { atributo: "(PRE)", classe: "atributo-pericia pre", treinamento: 1, modificador: "" }, // Intimidação
    { atributo: "(PRE)", classe: "atributo-pericia pre", treinamento: 1, modificador: "" }, // Intuição
    { atributo: "(INT)", classe: "atributo-pericia int", treinamento: 1, modificador: "" }, // Investigação
    { atributo: "(FOR)", classe: "atributo-pericia for", treinamento: 1, modificador: "" }, // Luta
    { atributo: "(INT)", classe: "atributo-pericia int", treinamento: 1, modificador: "" }, // Medicina
    { atributo: "(PRE)", classe: "atributo-pericia pre", treinamento: 1, modificador: "" }, // Percepção
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Pontaria
    { atributo: "(DES)", classe: "atributo-pericia des", treinamento: 1, modificador: "" }, // Reflexos
    { atributo: "(INT)", classe: "atributo-pericia int", treinamento: 1, modificador: "" }, // Religião
    { atributo: "(INT)", classe: "atributo-pericia int", treinamento: 1, modificador: "" }, // Sobrevivência
    { atributo: "(INT)", classe: "atributo-pericia int", treinamento: 1, modificador: "" }, // Tecnologia
    { atributo: "(PRE)", classe: "atributo-pericia pre", treinamento: 1, modificador: "" }  // Vontade
];

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

function criarHabilidade(dados=null){
    
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
    
    if(dados){

    card.querySelector(".nome-habilidade").value =
        dados.nome;

    card.querySelectorAll("textarea")[0].value =
        dados.descricao;

    card.querySelectorAll("input")[1].value =
        dados.custo;

    card.querySelectorAll("input")[2].value =
        dados.dano;

    card.querySelectorAll("input")[3].value =
        dados.alcance;

    card.querySelectorAll("textarea")[1].value =
        dados.efeito;

    }

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
            
            salvarFichaAtual();

        }

    };

    lista.appendChild(card);
    
    if(!carregandoFicha){
    salvarFichaAtual();
    }
}

botao.addEventListener("click", () => criarHabilidade());

const listaItens = document.getElementById("lista-itens");
const botaoAdicionarItem = document.getElementById("adicionar-item");

function criarItem(dados=null){

    const card = document.createElement("div");
    card.className = "card-item";

    card.innerHTML = `
        <div class="topo-item">

            <input type="checkbox" class="item-checkbox">

            <input class="nome-item" placeholder="Novo item">

            <div class="botoes-item">

                <button class="btn abrir-item">▶</button>

                <button class="btn apagar-item">🗑</button>

            </div>

        </div>

        <div class="conteudo-item">

            <label>Descrição</label>

            <textarea placeholder="Descrição do item"></textarea>

            <label>Peso</label>
            <input class="peso-item" type="number" placeholder="0" min="0" step="0.1">

        </div>
    `;
    
    if(dados){

    card.querySelector(".nome-item").value = dados.nome;
    card.querySelector("textarea").value = dados.descricao;
    card.querySelector(".peso-item").value = dados.peso || 0;

    }

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
            
            salvarFichaAtual();

        }

    };

    listaItens.appendChild(card);
    
    if(!carregandoFicha){
    salvarFichaAtual();
    }

}

botaoAdicionarItem.addEventListener("click", () => criarItem());

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

    const treinoFortitudeInput = document.querySelectorAll(".treinamento")[9];
    const bonus = treinoFortitudeInput ? Number(treinoFortitudeInput.value) || 0 : 0;

    const maxVida = 10 + vigor + bonus;

    atualizarStatus(
        document.querySelectorAll(".status")[0],
        maxVida
    );
}

function atualizarSanidade(){

    const intelecto = Number(document.querySelectorAll(".quadrado")[2].value);

    const treinoVontadeInput = document.querySelectorAll(".pericia")[23]
        .querySelector(".treinamento");
    const bonusSanidade = treinoVontadeInput ? Number(treinoVontadeInput.value) || 0 : 0;

    const maxSanidade = 20 + 3 * intelecto + bonusSanidade;

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

        historia:"",
        
        atributos:[1,1,1,1,1],

        status:[
            {atual:11,maximo:11},
            {atual:23,maximo:23},
            {atual:18,maximo:18}
        ],

        pericias: structuredClone(PERICIAS_PADRAO),

        habilidades: [
    {
        nome:"",
        descricao:"",
        custo:"",
        dano:"",
        alcance:"",
        efeito:""
    },
    {
        nome:"",
        descricao:"",
        custo:"",
        dano:"",
        alcance:"",
        efeito:""
    },
    {
        nome:"",
        descricao:"",
        custo:"",
        dano:"",
        alcance:"",
        efeito:""
    }
],

inventario:[
    {nome:"",descricao:"",peso:0},
    {nome:"",descricao:"",peso:0},
    {nome:"",descricao:"",peso:0}
],

    maxAtributos: 10,
    maxPericias: 120  
    };

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

function codificarFicha(ficha) {

    const json = JSON.stringify(ficha);

    const bytes = new TextEncoder().encode(json);

    let binario = "";

    bytes.forEach(byte => {
        binario += String.fromCharCode(byte);
    });

    const base64 = btoa(binario);

    return encodeURIComponent(base64);
}


function decodificarFicha(dados) {

    const base64 = decodeURIComponent(dados);

    const binario = atob(base64);

    const bytes = Uint8Array.from(
        binario,
        c => c.charCodeAt(0)
    );

    const json =
        new TextDecoder().decode(bytes);

    return JSON.parse(json);
}

function compartilharFicha() {

    salvarFichaAtual();

    const ficha = fichaAtual();

    if (!ficha) {

        alert("Nenhuma ficha selecionada.");

        return;
    }

    try {

        const json =
            JSON.stringify(ficha);

        const comprimido =
            LZString.compressToEncodedURIComponent(json);

        const url =
            window.location.origin +
            window.location.pathname +
            "?f=" +
            comprimido;

        navigator.clipboard.writeText(url)
            .then(() => {

                alert(
                    "Link da ficha copiado para a área de transferência!"
                );

            })
            .catch(() => {

                prompt(
                    "Copie o link da ficha:",
                    url
                );

            });

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível criar o link da ficha."
        );

    }

}

document.getElementById("compartilhar-ficha").onclick = () => {

    compartilharFicha();

};

function verificarFichaCompartilhada() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const dados =
        parametros.get("f");

    if (!dados) {
        return;
    }

    try {

        const json =
            LZString.decompressFromEncodedURIComponent(
                dados
            );

        if (!json) {

            throw new Error(
                "Não foi possível descomprimir a ficha."
            );

        }

        const ficha =
            JSON.parse(json);

        const resposta =
            confirm(
                "Uma ficha foi compartilhada com você!\n\n" +
                "Personagem: " +
                (ficha.personagem || "Sem nome") +
                "\n\n" +
                "Deseja importar esta ficha?"
            );

        if (!resposta) {

            return;

        }

        ficha.id = Date.now();

        banco.fichas.push(ficha);

        banco.atual = ficha.id;

        salvarBanco();

        carregarFichaAtual();

        atualizarBotaoExcluir();

        alert(
            "Ficha importada com sucesso!"
        );

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível importar a ficha.\n\n" +
            "O link pode estar inválido ou corrompido."
        );

    }

}

function salvarFichaAtual(){

    const ficha = fichaAtual();

    ficha.jogador =
        document.getElementById("jogador").value;

    ficha.personagem =
        document.getElementById("personagem").value;

    ficha.historia =
        document.getElementById("texto-historia").value;
    
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
            
            treinamento: Math.min(14, Math.max(1, Number(p.querySelector(".treinamento").value) || 1)),

            modificador:p.querySelector(".modificador").value
            
        }));
            
        ficha.habilidades =
    [...document.querySelectorAll(".card-habilidade")]
    .map(card=>({

        nome: card.querySelector(".nome-habilidade").value,
        descricao: card.querySelectorAll("textarea")[0].value,
        custo: card.querySelectorAll("input")[1].value,
        dano: card.querySelectorAll("input")[2].value,
        alcance: card.querySelectorAll("input")[3].value,
        efeito: card.querySelectorAll("textarea")[1].value

        }));

        ficha.inventario =
    [...document.querySelectorAll(".card-item")]
    .map(card=>({

        nome: card.querySelector(".nome-item").value,
        descricao: card.querySelector("textarea").value,
        peso: Number(card.querySelector(".peso-item").value) || 0,
        marcado: card.querySelector(".item-checkbox").checked
        }));

    const maxA = document.querySelector(".contador-atributos .maximo-contador");
    const maxP = document.querySelector(".contador-pericias .maximo-contador");

    ficha.maxAtributos = maxA ? Number(maxA.value) : (ficha.maxAtributos ?? 10);
    ficha.maxPericias = maxP ? Number(maxP.value) : (ficha.maxPericias ?? 12);

    salvarBanco();
    
    atualizarBotaoExcluir();

    atualizarContadores();

}

// Função para aplicar clamp em um input de treinamento
function aplicarClampTreinamento(input) {
    let v = Number(input.value);
    if (!Number.isFinite(v) || isNaN(v)) v = 1;
    v = Math.round(v);
    if (v < 1) v = 1;
    if (v > 14) v = 14;
    input.value = v;
}

function carregarFichaAtual(){
    
    carregandoFicha = true;
    
    lista.innerHTML = "";
    
    listaItens.innerHTML = "";

    const ficha = fichaAtual();

    document.getElementById("jogador").value =
        ficha.jogador;

    document.getElementById("personagem").value =
        ficha.personagem;

    document.getElementById("texto-historia").value =
        ficha.historia || "";

    document.querySelectorAll(".quadrado")
    .forEach((q,i)=>{

        q.value=ficha.atributos[i];

    });

    const contadorAtribMax = document.querySelector(".contador-atributos .maximo-contador");
    const contadorPericMax = document.querySelector(".contador-pericias .maximo-contador");

    if (contadorAtribMax) {
        contadorAtribMax.value = ficha.maxAtributos ?? 10;
    }

    if (contadorPericMax) {
        contadorPericMax.value = ficha.maxPericias ?? 12;
    }

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

        // agora escreve o value do input de treinamento
        const treinoInput = p.querySelector(".treinamento");
        if (treinoInput) {
            // garante que o valor fique entre 1 e 14 ao carregar
            treinoInput.value = Math.min(14, Math.max(1, Number(dados.treinamento ?? 1)));
        }

        p.querySelector(".modificador")
        .value=dados.modificador;
        
    });

    ficha.habilidades.forEach(h=>{

        criarHabilidade(h);

    });

    ficha.inventario.forEach(i=>{

        criarItem(i);

    });

    document.querySelectorAll(".item-checkbox").forEach((checkbox, index) => {
        if (ficha.inventario[index]) {
            checkbox.checked = ficha.inventario[index].marcado || false;
        }
    });
    
    // Adiciona listeners aos campos de treinamento - clamp APENAS ao sair do campo (blur)
    document.querySelectorAll(".treinamento").forEach(input => {
        input.setAttribute('min', '1');
        input.setAttribute('max', '14');

        // Evento 'blur' - quando o usuário sai do campo
        input.addEventListener("blur", () => {
            if (!carregandoFicha) {
                aplicarClampTreinamento(input);
                
                setTimeout(() => {
                    atualizarContadores();
                    salvarFichaAtual();
                    atualizarFicha();
                }, 10);
            }
        });

        // Evento 'input' - permite edição livre enquanto digita
        input.addEventListener("input", () => {
            if (!carregandoFicha) {
                setTimeout(() => {
                    atualizarContadores();
                    atualizarFicha();
                }, 10);
            }
        });
    });

    atualizarFicha();

    atualizarContadores();
    
    carregandoFicha = false;

}

carregarBanco();

document.addEventListener("input",()=>{

    if(carregandoFicha) return;
    
    salvarFichaAtual();

});

carregarFichaAtual();

document.addEventListener("click",()=>{

    if(carregandoFicha) return;
    
    setTimeout(salvarFichaAtual,20);

});

verificarFichaCompartilhada();

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

document.getElementById("criar-ficha").onclick = ()=>{

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

let fichaArrastando = null;
let indiceOriginal = -1;

function atualizarListaFichas(){

    const lista = document.getElementById("lista-fichas");

    lista.innerHTML = "";

    banco.fichas.forEach((ficha)=>{

        const div = document.createElement("div");

        div.className = "ficha-lista";
        
        div.dataset.id = ficha.id;
        
        div.style.position = "relative";

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

            banco.fichas =
                banco.fichas.filter(f=>f.id!==ficha.id);

            if(banco.atual === ficha.id){

                banco.atual = banco.fichas[0].id;

            }

            salvarBanco();

            atualizarListaFichas();

            atualizarBotaoExcluir();

        };

        lista.appendChild(div);
        
        let segurando = false;
let timer = null;
let inicioX = 0;
let inicioY = 0;

div.addEventListener("pointerdown",(e)=>{

    inicioX = e.clientX;
    inicioY = e.clientY;

    timer = setTimeout(()=>{

    segurando = true;

    fichaArrastando = div;

    indiceOriginal = [...lista.children].indexOf(div);

    div.classList.add("arrastando");

},300);

});

div.addEventListener("pointermove",(e)=>{

    if(!segurando) return;

    const dx = e.clientX - inicioX;
    const dy = e.clientY - inicioY;

    div.style.transform = "";

    const centroY = e.clientY;

    const fichas = [...lista.querySelectorAll(".ficha-lista")];

    fichas.forEach((f,i)=>{

        if(f===div) return;

        const r = f.getBoundingClientRect();

        if(centroY > r.top && centroY < r.bottom){

            if(i!==indiceOriginal){

                lista.insertBefore(
                    div,
                    i>indiceOriginal
                    ? f.nextSibling
                    : f
                );

                indiceOriginal = i;

            }

        }

    });

});

function pararArrastar(){

    clearTimeout(timer);

    if(!segurando) return;

    segurando = false;

    div.classList.remove("arrastando");

    div.style.transform = "";
    
    const novaOrdem = [];

document.querySelectorAll("#lista-fichas .ficha-lista").forEach(card => {

    const id = Number(card.dataset.id);

    const ficha = banco.fichas.find(f => f.id === id);

    if (ficha) {
        novaOrdem.push(ficha);
    }

});

banco.fichas = novaOrdem;

salvarBanco();

atualizarListaFichas();

fichaArrastando = null;

}

div.addEventListener("pointerup", pararArrastar);
        
div.addEventListener("pointercancel",pararArrastar);

    });

}

function abrirListaFichas(){

    salvarFichaAtual();

    atualizarListaFichas();
    
    document.querySelector("header").style.display = "none";

    document.querySelector("main").style.display="none";

    document.querySelector(".historia").style.display="none";

    document.getElementById("tela-fichas")
        .style.display="block";

}

function fecharListaFichas(){
    
    document.querySelector("header").style.display = "block";

    document.querySelector("main").style.display="grid";

    document.querySelector(".historia").style.display="block";

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

document.getElementById("nova-ficha-lista").onclick = ()=>{
    
    salvarFichaAtual();

    criarFichaNova();

    carregarFichaAtual();

    fecharListaFichas();

};

function atualizarContadorAtributos() {
    const atributos = [...document.querySelectorAll(".quadrado")];
    const soma = atributos.reduce((total, input) => total + Number(input.value), 0);
    
    const contadorAtributos = document.querySelector(".contador-atributos .valor-contador");
    if (contadorAtributos) {
        contadorAtributos.value = soma;
    }
}

function atualizarContadorPericias() {
    const pericias = [...document.querySelectorAll(".pericia")];
    
    const soma = pericias.reduce((total, pericia) => {
        const val = Number(pericia.querySelector(".treinamento").value) || 0;
        return total + val;
    }, 0);
    
    const contadorPericias = document.querySelector(".contador-pericias .valor-contador");
    if (contadorPericias) {
        contadorPericias.value = soma;
    }
}

function atualizarContadorCarga() {
    const forca = Number(document.querySelectorAll(".quadrado")[1].value);
    const maxCarga = 5 + 2 * forca;
    
    const contadorCarga = document.querySelector(".contador-carga .maximo-contador");
    if (contadorCarga) {
        contadorCarga.value = maxCarga;
    }
    
    const totalPeso = [...document.querySelectorAll(".peso-item")]
        .reduce((total, input) => total + (Number(input.value) || 0), 0);
    
    const contadorValor = document.querySelector(".contador-carga .valor-contador");
    if (contadorValor) {
        contadorValor.value = totalPeso.toFixed(1);
    }
}

atributos.forEach(input => {
    input.addEventListener("input", () => {
        atualizarContadorAtributos();
    });
});

document.querySelectorAll(".treinamento").forEach(input => {
    input.addEventListener("input", () => {
        setTimeout(atualizarContadores, 10);
        setTimeout(atualizarFicha, 10);
    });
});

function atualizarContadores() {
    atualizarContadorAtributos();
    atualizarContadorPericias();
    atualizarContadorCarga();
}

setTimeout(atualizarContadores, 50);

function salvarHistoria() {
    const ficha = fichaAtual();
    if (ficha) {
        ficha.historia = document.getElementById("texto-historia").value;
        salvarBanco();
    }
}

function carregarHistoria() {
    const ficha = fichaAtual();
    const textoHistoria = document.getElementById("texto-historia");
    if (ficha && textoHistoria) {
        textoHistoria.value = ficha.historia || "";
    }
}

document.getElementById("texto-historia").addEventListener("input", () => {
    if (carregandoFicha) return;
    salvarHistoria();
});

const historiaBotaoSecao = document.querySelector(".historia .btn-secao");
if (historiaBotaoSecao) {
    const historiaConteudo = historiaBotaoSecao.closest(".bloco").querySelector(".conteudo-secao");
    historiaBotaoSecao.onclick = () => {
        historiaConteudo.classList.toggle("fechado");
        historiaBotaoSecao.textContent = historiaConteudo.classList.contains("fechado") ? "▶" : "▼";
    };
}

const originalCarregarFichaAtual = carregarFichaAtual;
carregarFichaAtual = function() {
    originalCarregarFichaAtual.call(this);
    carregarHistoria();
};

const originalSalvarFichaAtual = salvarFichaAtual;
salvarFichaAtual = function() {
    originalSalvarFichaAtual.call(this);
    salvarHistoria();
};

document.querySelectorAll(".quadrado")[1].addEventListener("input", () => {
    atualizarContadorCarga();
});

const botaoAdicionarItemOriginal = botaoAdicionarItem;
botaoAdicionarItem.addEventListener("click", () => {
    setTimeout(atualizarContadorCarga, 10);
});

listaItens.addEventListener("click", (e) => {
    if (e.target.classList.contains("apagar-item")) {
        setTimeout(atualizarContadorCarga, 50);
    }
});

listaItens.addEventListener("input", (e) => {
    if (e.target.classList.contains("peso-item")) {
        atualizarContadorCarga();
    }
});

listaItens.addEventListener("change", (e) => {
    if (e.target.classList.contains("item-checkbox")) {
        if (!carregandoFicha) {
            salvarFichaAtual();
        }
    }
});

setTimeout(atualizarContadorCarga, 100);
