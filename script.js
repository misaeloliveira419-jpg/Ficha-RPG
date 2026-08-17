let carregandoFicha = false;

const PERICIAS_PADRAO = [
    { id:"acro", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"ades", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"art", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"atle", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"atual", atributo:"(INT)", classe:"atributo-pericia int", treinamento:1, modificador:"" },
    { id:"cien", atributo:"(INT)", classe:"atributo-pericia int", treinamento:1, modificador:"" },
    { id:"cond", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"crim", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"diplo", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"engan", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"forti", atributo:"(VIG)", classe:"atributo-pericia vig", treinamento:1, modificador:"" },
    { id:"furtiv", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"inici", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"intim", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"intui", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"invest", atributo:"(INT)", classe:"atributo-pericia int", treinamento:1, modificador:"" },
    { id:"lut", atributo:"(FOR)", classe:"atributo-pericia for", treinamento:1, modificador:"" },
    { id:"med", atributo:"(INT)", classe:"atributo-pericia int", treinamento:1, modificador:"" },
    { id:"percep", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"pont", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"refl", atributo:"(DES)", classe:"atributo-pericia des", treinamento:1, modificador:"" },
    { id:"relig", atributo:"(INT)", classe:"atributo-pericia int", treinamento:1, modificador:"" },
    { id:"sedu", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" },
    { id:"sobrev", atributo:"(INT)", classe:"atributo-pericia int", treinamento:1, modificador:"" },
    { id:"tecno", atributo:"(INT)", classe:"atributo-pericia int", treinamento:1, modificador:"" },
    { id:"vont", atributo:"(PRE)", classe:"atributo-pericia pre", treinamento:1, modificador:"" }
];

const PERICIAS_IDS_LEGADO = [
    "acro",
    "ades",
    "atle",
    "atual",
    "cien",
    "cond",
    "crim",
    "diplo",
    "engan",
    "forti",
    "furtiv",
    "inici",
    "intim",
    "intui",
    "invest",
    "lut",
    "med",
    "percep",
    "pont",
    "refl",
    "relig",
    "sobrev",
    "tecno",
    "vont"
];

function buscarPericia(id) {
    return document.querySelector(
        `.pericia[data-id="${id}"]`
    );
}

const BONUS_CONHECIMENTO_ESPECIFICO = 2;


function preencherSelectConhecimentoEspecifico(){

    const select =
        document.getElementById(
            "conhecimento-especifico-select"
        );

    if(!select) return;

    const valorAnterior = select.value;

    select.innerHTML =
        `<option value="">Escolha uma perícia</option>`;

    document
    .querySelectorAll(".pericia[data-id]")
    .forEach(pericia => {

        const id = pericia.dataset.id;

        const nome =
            pericia.querySelector("span")
            ?.textContent
            .trim();

        if(!id || !nome) return;

        const option =
            document.createElement("option");

        option.value = id;
        option.textContent = nome;

        select.appendChild(option);

    });

    if(
        [...select.options]
        .some(option => option.value === valorAnterior)
    ){
        select.value = valorAnterior;
    }
}


function obterBaseTreinamento(input){

    if(!input) return 1;

    const base =
        Number(input.dataset.valorBase);

    if(Number.isFinite(base)){
        return base;
    }

    let valor =
        Number(input.value);

    if(!Number.isFinite(valor)){
        valor = 1;
    }

    valor =
        Math.min(
            14,
            Math.max(1, Math.round(valor))
        );

    return valor;
}


function aplicarBonusConhecimentoEspecifico(){

    const select =
        document.getElementById(
            "conhecimento-especifico-select"
        );

    if(!select) return;

    const escolhida =
        select.value;

    document
    .querySelectorAll(".pericia[data-id]")
    .forEach(pericia => {

        const input =
            pericia.querySelector(".treinamento");

        if(!input) return;

        const base =
            obterBaseTreinamento(input);

        input.dataset.valorBase =
            String(base);

        if(pericia.dataset.id === escolhida){

            input.value =
                base +
                BONUS_CONHECIMENTO_ESPECIFICO;

            input.max = 16;

        }else{

            input.value = base;

            input.max = 14;

        }
        
        atualizarSucessosPericias();
    });

}

preencherSelectConhecimentoEspecifico();

const selectConhecimentoEspecifico =
    document.getElementById(
        "conhecimento-especifico-select"
    );

if(selectConhecimentoEspecifico){

    selectConhecimentoEspecifico.addEventListener("change", () => {
        
        if(carregandoFicha) return;
        
        aplicarBonusConhecimentoEspecifico();
        
        const periciaEscolhida =
        buscarPericia(
            selectConhecimentoEspecifico.value
        );
        
        limitarPericiasAltas(
        periciaEscolhida
        );

    atualizarSucessosPericias();
    atualizarContadores();
    atualizarFicha();
    salvarFichaAtual();

});

}

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
    <textarea class="descricao-habilidade"></textarea>
    <label>Custo</label>
    <textarea class="custo-habilidade"></textarea>
    
    <label>Dano</label>
    <textarea class="dano-habilidade"></textarea>
    
    <label>Alcance</label>
    <textarea class="alcance-habilidade"></textarea>
    
    <label>Resistência</label>
    <textarea class="resistencia-habilidade"></textarea>
    
    <label>Efeito</label>
    <textarea class="efeito-habilidade"></textarea>

        </div>
    `;

    if(dados){

    card.querySelector(".nome-habilidade").value =
        dados.nome || "";

    card.querySelector(".descricao-habilidade").value =
        dados.descricao || "";

    card.querySelector(".custo-habilidade").value =
        dados.custo || "";

    card.querySelector(".dano-habilidade").value =
        dados.dano || "";

    card.querySelector(".alcance-habilidade").value =
        dados.alcance || "";

    card.querySelector(".resistencia-habilidade").value =
        dados.resistencia || "";

    card.querySelector(".efeito-habilidade").value =
        dados.efeito || "";
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

            <textarea class="descricao-item" placeholder="Descrição do item"></textarea>

            <label>Peso</label>
            <input class="peso-item" type="number" placeholder="0" min="0" step="0.1">

        </div>
    `;

    if(dados){

    card.querySelector(".nome-item").value = dados.nome;
    card.querySelector(".descricao-item").value = dados.descricao || "";
    card.querySelector(".peso-item").value = Number(dados.peso) || 0;
    card.querySelector(".item-checkbox").checked = !!dados.marcado;

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

    const periciaFortitude = buscarPericia("forti");
    const treinoFortitudeInput = periciaFortitude ? periciaFortitude.querySelector(".treinamento") : null;
    const bonus = treinoFortitudeInput ? Number(treinoFortitudeInput.value) || 0 : 0;

    const maxVida = 10 + vigor + Math.floor(bonus/2);

    atualizarStatus(
        document.querySelectorAll(".status")[0],
        maxVida
    );
}

function atualizarDeterminacao(){

    const presenca = Number(document.querySelectorAll(".quadrado")[3].value);

    const periciaVontade = buscarPericia("vont");

    const treinoVontadeInput = periciaVontade? periciaVontade.querySelector(".treinamento") : null;

    const vontade = treinoVontadeInput ? Number(treinoVontadeInput.value) || 0 : 0;

    const maxDeterminacao = 30 +(3 * presenca) + Math.floor(vontade / 2);

    atualizarStatus(document.querySelectorAll(".status")[1], maxDeterminacao);
}

function criarCamposSucessoPericias(){

    document
    .querySelectorAll(".pericia")
    .forEach(pericia => {

        if(
            pericia.querySelector(
                ".sucessos-pericia"
            )
        ){
            return;
        }

        const treinamento =
            pericia.querySelector(".treinamento");

        if(!treinamento){
            return;
        }

        const sucessos =
            document.createElement("div");

        sucessos.className =
            "sucessos-pericia";

        sucessos.innerHTML = `
            <div class="valor-bom">1</div>
            <div class="valor-extremo">1</div>
        `;

        treinamento.insertAdjacentElement(
            "afterend",
            sucessos
        );

    });

}

function atualizarSucessosPericias(){

    document
    .querySelectorAll(".pericia")
    .forEach(pericia => {

        const treinamento =
            pericia.querySelector(".treinamento");

        const campoBom =
            pericia.querySelector(".valor-bom");

        const campoExtremo =
            pericia.querySelector(".valor-extremo");

        if(
            !treinamento ||
            !campoBom ||
            !campoExtremo
        ){
            return;
        }

        let valor =
            Number(treinamento.value);

        if(!Number.isFinite(valor)){
            valor = 1;
        }

        valor =
            Math.max(1, valor);

        const bom =
            Math.max(
                1,
                Math.floor(valor / 2)
            );

        const extremo =
            Math.max(
                1,
                Math.floor(valor / 5)
            );

        campoBom.textContent =
            bom;

        campoExtremo.textContent =
            extremo;

    });

}

function limitarPericiasAltas(periciaAlterada = null){

    const pericias =
        [...document.querySelectorAll(".pericia[data-id]")];

    const selectConhecimento =
        document.getElementById(
            "conhecimento-especifico-select"
        );

    const periciasAltas =
        pericias.filter(pericia => {

            const input =
                pericia.querySelector(".treinamento");

            if(!input) return false;

            const valorFinal =
                Number(input.value) || 0;

            return valorFinal >= 12;

        });

    // Até 4 perícias com 12 ou mais é permitido
    if(periciasAltas.length <= 4){
        return;
    }


    /*
        Primeiro tenta diminuir justamente a
        perícia que o usuário acabou de alterar.
    */

    let periciaParaDiminuir = null;

    if(
        periciaAlterada &&
        periciasAltas.includes(periciaAlterada)
    ){
        periciaParaDiminuir =
            periciaAlterada;
    }

    /*
        Caso a função tenha sido chamada sem
        especificar uma perícia, diminui a última
        perícia excedente.
    */

    if(!periciaParaDiminuir){

        periciaParaDiminuir =
            periciasAltas[
                periciasAltas.length - 1
            ];

    }


    const input =
        periciaParaDiminuir
        .querySelector(".treinamento");

    if(!input) return;


    const recebeConhecimento =
        selectConhecimento &&
        selectConhecimento.value ===
        periciaParaDiminuir.dataset.id;


    /*
        Se recebe +2 de C. Específicos:

        base 9 + bônus 2 = 11

        Caso contrário:

        base 11 = 11
    */

    const novoValorBase =
        recebeConhecimento
        ? 9
        : 11;


    input.dataset.valorBase =
        String(novoValorBase);

    input.value = 11;


    atualizarSucessosPericias();

}

criarCamposSucessoPericias();
atualizarSucessosPericias();

function atualizarFicha() {

    atualizarVida();
    atualizarDeterminacao();
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

        foto:"",
        
        historia:"",

        atributos:[1,1,1,1,1],
        
        deslocamento:{
            metros:9,
            quadrados:6
        },

        status:[
        {atual:12,maximo:12},
        {atual:33,maximo:33}
],

        pericias: structuredClone(PERICIAS_PADRAO),
        
        conhecimentoEspecifico: "",
        
        habilidades: [
    {
        nome:"",
        descricao:"",
        custo:"",
        dano:"",
        alcance:"",
        resistencia:"",
        efeito:""
    },
    {
        nome:"",
        descricao:"",
        custo:"",
        dano:"",
        alcance:"",
        resistencia:"",
        efeito:""
    },
    {
        nome:"",
        descricao:"",
        custo:"",
        dano:"",
        alcance:"",
        resistencia:"",
        efeito:""
    }
],

inventario:[
    {nome:"",descricao:"",peso:0},
    {nome:"",descricao:"",peso:0},
    {nome:"",descricao:"",peso:0}
],

    maxAtributos: 10,
    maxPericias: 100  
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

function normalizarFicha(ficha){

    if(!ficha || typeof ficha !== "object") ficha = {};

    ficha.id = Number(ficha.id) || Date.now();
    ficha.jogador = typeof ficha.jogador === "string" ? ficha.jogador : "";
    ficha.personagem = typeof ficha.personagem === "string" ? ficha.personagem : "";
    ficha.foto = typeof ficha.foto === "string" ? ficha.foto : "";
    ficha.historia = typeof ficha.historia === "string" ? ficha.historia : "";
    
    const deslocamento = ficha.deslocamento || {};
    
    let metros = Number(deslocamento.metros);
    
    if (!Number.isFinite(metros) || metros < 1) {
        metros = 9;
    }
    
    metros = Math.floor(metros);
    
    let quadrados = metros / 1.5;
    
    quadrados = Number(quadrados.toFixed(1));
    
    ficha.deslocamento = {
        metros: metros,
        quadrados: quadrados
    };
    
    const atributos = Array.isArray(ficha.atributos) ? ficha.atributos : [];
    ficha.atributos = [0,1,2,3,4].map(i=>{
        let v = Number(atributos[i]);
        if(!Number.isFinite(v)) v = 1;
        return Math.min(5, Math.max(0, Math.round(v)));
    });

    const status = Array.isArray(ficha.status) ? ficha.status : [];
    const statusPadrao = [
    {atual:12,maximo:12},
    {atual:33,maximo:33}
    ];
    ficha.status = statusPadrao.map((padrao,i)=>{
        const s = status[i] || {};
        let maximo = Number(s.maximo);
        let atual = Number(s.atual);
        if(!Number.isFinite(maximo) || maximo <= 0) maximo = padrao.maximo;
        if(!Number.isFinite(atual)) atual = maximo;
        return { atual: Math.max(0, atual), maximo: maximo };
    });

    const pericias =
    Array.isArray(ficha.pericias)
    ? ficha.pericias
    : [];
    
    const mapaPericias = new Map();
    
    pericias.forEach((p, i) => {
        
        if (!p || typeof p !== "object") {
            return;
        }
        
        const id =
        typeof p.id === "string" && p.id
        ? p.id
        : PERICIAS_IDS_LEGADO[i];
        
        if (id) {
            mapaPericias.set(id, p);
        }
        
    });
    
    ficha.pericias = PERICIAS_PADRAO.map(padrao => {
        
        const p =
        mapaPericias.get(padrao.id) || {};
        
        let treino = Number(p.treinamento);
        
        if (!Number.isFinite(treino)) {
            treino = 1;
        }
        
        return {
            
            id: padrao.id,
            
            atributo:
            typeof p.atributo === "string"
            ? p.atributo
            : padrao.atributo,
            
            classe:
            typeof p.classe === "string"
            ? p.classe
            : padrao.classe,
            
            treinamento:
            Math.min(
                14,
                Math.max(
                    1,
                    Math.round(treino)
                )
            ),
            
            modificador:
            typeof p.modificador === "string"
            ? p.modificador
            : ""
            
        };
        
    });
    
    let conhecimentoEspecifico =
    typeof ficha.conhecimentoEspecifico === "string"
    ? ficha.conhecimentoEspecifico
    : "";
    
    if(
    conhecimentoEspecifico &&
    !PERICIAS_PADRAO.some(
        p => p.id === conhecimentoEspecifico
    )
    ){
        conhecimentoEspecifico = "";
    }
    
    ficha.conhecimentoEspecifico =
    conhecimentoEspecifico;

    ficha.habilidades =
    (Array.isArray(ficha.habilidades)
    ? ficha.habilidades
    : [])
    .map(h=>({

        nome:
            String((h && h.nome) || ""),

        descricao:
            String((h && h.descricao) || ""),

        custo:
            String((h && h.custo) || ""),

        dano:
            String((h && h.dano) || ""),

        alcance:
            String((h && h.alcance) || ""),

        resistencia:
            String((h && h.resistencia) || ""),

        efeito:
            String((h && h.efeito) || "")

    }));

    ficha.inventario = (Array.isArray(ficha.inventario) ? ficha.inventario : [])
        .map(i=>({
            nome: String((i && i.nome) || ""),
            descricao: String((i && i.descricao) || ""),
            peso: Number(i && i.peso) || 0,
            marcado: !!(i && i.marcado)
        }));

    ficha.maxAtributos = Number(ficha.maxAtributos) || 10;
    ficha.maxPericias = Number(ficha.maxPericias) || 100;

    return ficha;
}

function carregarBanco(){

    const salvo = localStorage.getItem("BancoFichasRPG");

    if(salvo){

        try{

            const dados = JSON.parse(salvo);

            if(dados && typeof dados === "object" && Array.isArray(dados.fichas)){

                banco = {
                    atual: dados.atual ?? null,
                    fichas: dados.fichas.map(normalizarFicha)
                };

            }

        }catch(erro){

            console.error("Banco de fichas corrompido, iniciando um novo.", erro);

        }

    }

    if(!banco || !Array.isArray(banco.fichas)){
        banco = { atual: null, fichas: [] };
    }

    if(banco.fichas.length===0){

        criarFichaNova();

    }

    if(!banco.fichas.some(f=>f.id===banco.atual)){

        banco.atual = banco.fichas[0].id;

        salvarBanco();

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
        
        const fichaCompartilhada = {
            ...ficha,
            foto: ""
        };
        
        const json = JSON.stringify(fichaCompartilhada);

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
            normalizarFicha(JSON.parse(json));

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

    if(!ficha) return;

    ficha.jogador =
        document.getElementById("jogador").value;

    ficha.personagem =
        document.getElementById("personagem").value;

    const imagemPersonagem =
    document.getElementById("imagem-personagem");

    ficha.foto =
    imagemPersonagem?.dataset.foto || "";
    
    ficha.historia =
        document.getElementById("texto-historia").value;
    
    const inputMetros =
    document.querySelector(".valor-metro");
    
    if(inputMetros){

    let metrosBase =
        Number(inputMetros.dataset.valorBase);

    if(!Number.isFinite(metrosBase) || metrosBase < 1){

        metrosBase =
            Number(inputMetros.value) || 1;

    }

    metrosBase =
        Math.max(
            1,
            Math.floor(metrosBase)
        );

    ficha.deslocamento = {

        metros:
            metrosBase,

        quadrados:
            Number(
                (metrosBase / 1.5)
                .toFixed(1)
        )
    };
        
    }
    
    ficha.atributos = [...document.querySelectorAll(".quadrado")].map(x=>Number(x.value));

    ficha.status = [...document.querySelectorAll(".status")].map(s=>({

            atual:Number(s.querySelector(".atual").value),

            maximo:Number(s.querySelector(".maximo").value)

        }));

    ficha.pericias =
    [...document.querySelectorAll(".pericia")]
    .map(p => {

        const treinamentoInput =
            p.querySelector(".treinamento");

        const treinamentoBase =
            obterBaseTreinamento(
                treinamentoInput
            );

        return {

            id: p.dataset.id,

            atributo:
                p.querySelector(
                    ".atributo-pericia"
                ).textContent,

            classe:
                p.querySelector(
                    ".atributo-pericia"
                ).className,

            treinamento:
                treinamentoBase,

            modificador:
                p.querySelector(
                    ".modificador"
                ).value

        };

    });
    
    const selectConhecimento =
    document.getElementById(
        "conhecimento-especifico-select"
    );
    
    ficha.conhecimentoEspecifico =
    selectConhecimento
    ? selectConhecimento.value
    : "";

        ficha.habilidades =
    [...document.querySelectorAll(".card-habilidade")]
    .map(card=>({

        nome:
            card.querySelector(".nome-habilidade").value,

        descricao:
            card.querySelector(".descricao-habilidade").value,

        custo:
            card.querySelector(".custo-habilidade").value,

        dano:
            card.querySelector(".dano-habilidade").value,

        alcance:
            card.querySelector(".alcance-habilidade").value,

        resistencia:
            card.querySelector(".resistencia-habilidade").value,

        efeito:
            card.querySelector(".efeito-habilidade").value

    }));

        ficha.inventario =
    [...document.querySelectorAll(".card-item")]
    .map(card=>({

        nome: card.querySelector(".nome-item").value,
        descricao: card.querySelector(".descricao-item").value,
        peso: Number(card.querySelector(".peso-item").value) || 0,
        marcado: card.querySelector(".item-checkbox").checked
        }));

    const maxA = document.querySelector(".contador-atributos .maximo-contador");
    const maxP = document.querySelector(".contador-pericias .maximo-contador");

    ficha.maxAtributos = maxA ? Number(maxA.value) : (ficha.maxAtributos ?? 10);
    ficha.maxPericias = maxP ? Number(maxP.value) : (ficha.maxPericias ?? 100);

    salvarBanco();

    atualizarBotaoExcluir();

    atualizarContadores();

}

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

    const ficha = normalizarFicha(fichaAtual());

    if(!ficha){
        carregandoFicha = false;
        return;
    }

    document.getElementById("jogador").value =
        ficha.jogador;

    document.getElementById("personagem").value =
        ficha.personagem;

    const imagemPersonagem =
    document.getElementById("imagem-personagem");

    const textoFoto =
    document.getElementById("texto-foto");

    if(ficha.foto){
        
        imagemPersonagem.src =
        ficha.foto;
        
        imagemPersonagem.dataset.foto =
        ficha.foto;
        
        imagemPersonagem.style.display =
        "block";
        
        textoFoto.style.display =
        "none";
        
    }else{
        
        imagemPersonagem.removeAttribute("src");
        
        imagemPersonagem.dataset.foto =
        "";
        
        imagemPersonagem.style.display =
        "none";
        
        textoFoto.style.display =
        "block";
        
    }
    
    document.getElementById("texto-historia").value =
        ficha.historia || "";
    
    document.querySelectorAll(".quadrado").forEach((q, i) => {
        q.value =
        ficha.atributos[i] ?? 1;
    });
    
    const inputMetros =
    document.querySelector(".valor-metro");
    
    const inputQuadrados =
    document.querySelector(".valor-quadrado");
    
    if(inputMetros && inputQuadrados){

    let metrosBase =
        Number(ficha.deslocamento?.metros);

    if(!Number.isFinite(metrosBase) || metrosBase < 1){
        metrosBase = 9;
    }

    metrosBase =
        Math.floor(metrosBase);

    inputMetros.dataset.valorBase =
        String(metrosBase);

    inputMetros.value =
        metrosBase;

    inputQuadrados.value =
        Number(
            (metrosBase / 1.5)
            .toFixed(1)
        );

}

    const contadorAtribMax = document.querySelector(".contador-atributos .maximo-contador");
    const contadorPericMax = document.querySelector(".contador-pericias .maximo-contador");

    if (contadorAtribMax) {
        contadorAtribMax.value = ficha.maxAtributos ?? 10;
    }

    if (contadorPericMax) {
        contadorPericMax.value = ficha.maxPericias ?? 100;
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
    .forEach(p => {
        
        const id = p.dataset.id;
        
        const dados =
        ficha.pericias.find(
            pericia => pericia.id === id
        );
        
        if (!dados) {
            return;
        }
        
        const atributo =
        p.querySelector(".atributo-pericia");
        
        atributo.textContent =
        dados.atributo;
        
        atributo.className =
        dados.classe;
        
        const treinoInput =
        p.querySelector(".treinamento");
        
        if (treinoInput) {
            
            const valorBase =
            Math.min(
            14,
            Math.max(
            1,
            Number(dados.treinamento ?? 1)
            )
            );
            treinoInput.dataset.valorBase = String(valorBase);
            
            treinoInput.value = valorBase;
            
            treinoInput.max = 14;
            
        }
        
        p.querySelector(".modificador").value = dados.modificador;
    });

    ficha.habilidades.forEach(h=>{

        criarHabilidade(h);

    });

    ficha.inventario.forEach(i=>{

        criarItem(i);

    });
    
    preencherSelectConhecimentoEspecifico();
    
    const selectConhecimento =
    document.getElementById("conhecimento-especifico-select"
    );
    
    if(selectConhecimento){
        
        selectConhecimento.value = ficha.conhecimentoEspecifico || "";
    }
    
    aplicarBonusConhecimentoEspecifico();
    atualizarSucessosPericias();
    atualizarFicha();
    atualizarContadores();
    carregandoFicha = false;

}

const areaFotoPersonagem =
    document.getElementById("area-foto-personagem");

const inputFotoPersonagem =
    document.getElementById("input-foto-personagem");

const imagemPersonagem =
    document.getElementById("imagem-personagem");

const textoFoto =
    document.getElementById("texto-foto");


areaFotoPersonagem.addEventListener("click", () => {

    inputFotoPersonagem.click();

});


inputFotoPersonagem.addEventListener("change", () => {

    const arquivo =
        inputFotoPersonagem.files[0];

    if(!arquivo) return;

    if(!arquivo.type.startsWith("image/")){

        alert("Selecione um arquivo de imagem.");

        return;
    }

    const leitor =
        new FileReader();

    leitor.onload = () => {

        const imagemOriginal =
            new Image();

        imagemOriginal.onload = () => {

            const tamanhoMaximo = 500;

            let largura =
                imagemOriginal.width;

            let altura =
                imagemOriginal.height;

            if(
                largura > tamanhoMaximo ||
                altura > tamanhoMaximo
            ){

                const proporcao =
                    Math.min(
                        tamanhoMaximo / largura,
                        tamanhoMaximo / altura
                    );

                largura =
                    Math.round(
                        largura * proporcao
                    );

                altura =
                    Math.round(
                        altura * proporcao
                    );

            }

            const canvas =
                document.createElement("canvas");

            canvas.width = largura;
            canvas.height = altura;

            const ctx =
                canvas.getContext("2d");

            ctx.drawImage(
                imagemOriginal,
                0,
                0,
                largura,
                altura
            );

            const foto =
                canvas.toDataURL(
                    "image/jpeg",
                    0.82
                );

            imagemPersonagem.src =
                foto;

            imagemPersonagem.dataset.foto =
                foto;

            imagemPersonagem.style.display =
                "block";

            textoFoto.style.display =
                "none";

            salvarFichaAtual();

        };

        imagemOriginal.src =
            leitor.result;

    };

    leitor.readAsDataURL(arquivo);

});

carregarBanco();

let timerSalvamento = null;

function salvarComAtraso(){

    if(carregandoFicha) return;

    clearTimeout(timerSalvamento);

    timerSalvamento = setTimeout(salvarFichaAtual, 300);

}

document.addEventListener("input", salvarComAtraso);

carregarFichaAtual();

document.addEventListener("click", salvarComAtraso);

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

        const nomeFicha = document.createElement("span");
        nomeFicha.className = "nome-ficha";
        nomeFicha.textContent = ficha.personagem || "Sem nome";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "excluir-ficha";
        botaoExcluir.textContent = "🗑";

        div.appendChild(nomeFicha);
        div.appendChild(botaoExcluir);

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

                carregarFichaAtual();

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

    try{ div.setPointerCapture(e.pointerId); }catch(erro){}

    timer = setTimeout(()=>{

    segurando = true;

    fichaArrastando = div;

    indiceOriginal = [...lista.children].indexOf(div);

    div.classList.add("arrastando");

},300);

});

div.addEventListener("pointermove",(e)=>{

    if(!segurando){

        // se o usuário rolar antes dos 300ms, cancela o long-press
        if(Math.abs(e.clientX - inicioX) > 10 || Math.abs(e.clientY - inicioY) > 10){
            clearTimeout(timer);
        }

        return;
    }

    e.preventDefault();

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

function atualizarContadorPericias(){

    const pericias =
        [...document.querySelectorAll(".pericia")];

    const soma =
        pericias.reduce(
            (total, pericia) => {

                const input =
                    pericia.querySelector(
                        ".treinamento"
                    );

                const valorBase =
                    obterBaseTreinamento(input);

                return total + valorBase;

            },
            0
        );

    const contadorPericias =
        document.querySelector(
            ".contador-pericias .valor-contador"
        );

    if(contadorPericias){

        contadorPericias.value =
            soma;

    }

}

function atualizarContadorCarga() {
    const forca = Number(document.querySelectorAll(".quadrado")[1].value);
    
    const periciaAtletismo = buscarPericia("atle");
    const treinoAtletismoInput = periciaAtletismo ? periciaAtletismo.querySelector(".treinamento") : null;
    const bonusCarga = treinoAtletismoInput ? Number(treinoAtletismoInput.value) || 0 : 0;
    
    const maxCarga = 5 + 2 * forca + Math.floor(bonusCarga/4);

    const contadorCarga = document.querySelector(".contador-carga .maximo-contador");
    if (contadorCarga) {
        contadorCarga.value = maxCarga;
    }

    const totalPeso = [...document.querySelectorAll(".peso-item")].reduce((total, input) => total + (Number(input.value) || 0), 0);

    const contadorValor = document.querySelector(".contador-carga .valor-contador");
    if (contadorValor) {
        contadorValor.value = totalPeso.toFixed(1);
    }
    
    atualizarDeslocamentoPorCarga();
}

function calcularPenalidadeCarga(){

    const pesoAtual =
        Number(
            document.querySelector(
                ".contador-carga .valor-contador"
            )?.value
        ) || 0;

    const cargaMaxima =
        Number(
            document.querySelector(
                ".contador-carga .maximo-contador"
            )?.value
        ) || 0;

    if(cargaMaxima <= 0){
        return 0;
    }

    if(pesoAtual > cargaMaxima * 1.5){
        return 6;
    }

    if(pesoAtual > cargaMaxima){
        return 3;
    }

    return 0;
}


function atualizarDeslocamentoPorCarga(){

    const inputMetros =
        document.querySelector(".valor-metro");

    const inputQuadrados =
        document.querySelector(".valor-quadrado");

    if(!inputMetros || !inputQuadrados){
        return;
    }
    
    if(document.activeElement === inputMetros){
        return;
    }

    let metrosBase =
        Number(inputMetros.dataset.valorBase);

    if(!Number.isFinite(metrosBase) || metrosBase < 1){

        metrosBase =
            Number(inputMetros.value) || 1;

    }

    metrosBase =
        Math.max(
            1,
            Math.floor(metrosBase)
        );

    const penalidade =
        calcularPenalidadeCarga();

    const metrosAtuais =
        Math.max(
            1,
            metrosBase - penalidade
        );

    const quadradosAtuais =
        Number(
            (metrosAtuais / 1.5)
            .toFixed(1)
        );

    inputMetros.value =
        metrosAtuais;

    inputQuadrados.value =
        quadradosAtuais;

}

atributos.forEach(input => {
    input.addEventListener("input", () => {
        atualizarContadorAtributos();
    });
});

document
.querySelectorAll(".treinamento")
.forEach(input => {

    input.setAttribute("min", "1");
    input.setAttribute("max", "14");


    input.addEventListener("focus", () => {

        if(carregandoFicha) return;

        const pericia =
            input.closest(".pericia");

        const select =
            document.getElementById(
                "conhecimento-especifico-select"
            );

        if(
            pericia &&
            select &&
            pericia.dataset.id === select.value
        ){

            input.value =
                obterBaseTreinamento(input);

            input.max = 14;

        }

    });


    input.addEventListener("input", () => {

        if(carregandoFicha) return;

        const valor =
            Number(input.value);

        if(Number.isFinite(valor)){

            input.dataset.valorBase =
                String(valor);

        }
        
        atualizarSucessosPericias();
        atualizarContadores();
        atualizarFicha();

    });


    input.addEventListener("blur", () => {

        if(carregandoFicha) return;

        aplicarClampTreinamento(input);

        const base =
            Number(input.value);

        input.dataset.valorBase =
            String(base);

        const pericia =
            input.closest(".pericia");

        const select =
            document.getElementById(
                "conhecimento-especifico-select"
            );

        if(
            pericia &&
            select &&
            pericia.dataset.id === select.value
        ){

            input.value =
                base +
                BONUS_CONHECIMENTO_ESPECIFICO;

            input.max = 16;

        }else{

            input.value = base;

            input.max = 14;

        }
        
        limitarPericiasAltas(pericia);
        atualizarSucessosPericias();
        atualizarContadores();
        atualizarFicha();
        salvarFichaAtual();

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

setTimeout(atualizarContadorCarga, 100);

listaItens.addEventListener("change", (e) => {
    if (e.target.classList.contains("item-checkbox")) {
        if (!carregandoFicha) {
            salvarFichaAtual();
        }
    }
});

const campoMetros =
    document.querySelector(".valor-metro");

if(campoMetros){

    campoMetros.addEventListener("focus", () => {

        const metrosBase =
            Number(
                campoMetros.dataset.valorBase
            );

        if(Number.isFinite(metrosBase)){
            campoMetros.value = metrosBase;
        }

    });


    campoMetros.addEventListener("blur", () => {

        let metrosBase =
            Number(campoMetros.value);

        if(
            !Number.isFinite(metrosBase) ||
            metrosBase < 1
        ){
            metrosBase = 1;
        }

        metrosBase =
            Math.floor(metrosBase);

        campoMetros.dataset.valorBase =
            String(metrosBase);

        salvarFichaAtual();

        atualizarDeslocamentoPorCarga();

    });

}