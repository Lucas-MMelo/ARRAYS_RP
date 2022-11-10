const Produtos = [
    ["Livro", 4, 20.00 ],
    ["Prancheta", 2, 4.50 ],
    ["Impressora",1, 500.00 ],
    ["Caneta Azul", 6, 1.20 ],
    ["Notebook", 0, 5000 ],
    ["Caneta Preta", 3, 1.20 ],
    ["Caneta Vermelha", 8, 1.20 ],
    ["Caneta Quatro Cores", 7, 2.40 ],
    ["Lápis", 3, 0.80 ],
    ["Lapiseira", 5, 3.00 ],
    ["Papel Sulfite (Bloco)", 4, 10.00 ]
]

const indiceProdutos = [
    "Item",
    "Quantidade",
    "R$"
]

function criaTag(el){
    return document.createElement(el);
}

const pointer = "table";

makeTable(indiceProdutos, Produtos, pointer);

function makeTable(Index, Table, PlaceHolder) {

    const tableP = document.getElementById(PlaceHolder);
    let theadP = criaTag("thead");
    let tbodyP = criaTag("tbody");
    let lineHeadP = criaTag("tr");

    tableP.appendChild(theadP);
    tableP.appendChild(tbodyP);

    function makeCel(tag, text){
        tag = criaTag(tag);
        tag.textContent = text;
        return tag;
    }

    for (let i = 0; i < Index.length; i++){
        let th = makeCel("th", Index[i]);
        lineHeadP.appendChild(th);
    }

    theadP.appendChild(lineHeadP);

    for (let LR = 0; LR < Table.length; LR++){
        let lineBodyP = criaTag("tr");
        for (let LC = 0; LC < Table[LR].length; LC++){
            let td = makeCel("td", Table[LR][LC]);
            lineBodyP.appendChild(td);
        }
        tbodyP.appendChild(lineBodyP);
    }
}

function Filtrar() {
    const txtNumber = document.getElementById("TXTnumber01").value;
    const result = parseInt(txtNumber);

    const op = document.getElementById("01").value;

    const p = "ResultSearch";

    opWindow()

    if(document.getElementById("Qnt").checked === true){
        makeTable(indiceProdutos, callback(op, 1, result), p);
    }
    if(document.getElementById("R$").checked === true){
        makeTable(indiceProdutos, callback(op, 2, result), p);
    }
}

function callback(op, escolha, result){

    switch (op) {
    case "Maior":
        return Produtos.filter(Produtos => Produtos[escolha] > result);
    break;
    case "Menor":
        return Produtos.filter(Produtos => Produtos[escolha] < result);
    break;
    case "Maior ou igual" :
        return Produtos.filter(Produtos => Produtos[escolha] >= result);
    break;
    case "Menor ou igual":
        return Produtos.filter(Produtos => Produtos[escolha] <= result);
    break;
    }
}

function moreP() {
    let ProdutosAlt = Produtos;

    ProdutosAlt.forEach(ProdutosAlt => ProdutosAlt[2] += 5)
    opWindow()
    makeTable(indiceProdutos, ProdutosAlt, "ResultSearch");
}

function lessP() {
    let ProdutosAlt = Produtos;

    ProdutosAlt.forEach(ProdutosAlt => ProdutosAlt[2] -= 5)
    opWindow()
    makeTable(indiceProdutos, ProdutosAlt, "ResultSearch");
}

function moreU() {
    let ProdutosAlt = Produtos;

    ProdutosAlt.forEach(ProdutosAlt => ProdutosAlt[1] += 1)
    opWindow()
    makeTable(indiceProdutos, ProdutosAlt, "ResultSearch");
}

function lessU() {
    let ProdutosAlt = Produtos;

    ProdutosAlt.forEach(ProdutosAlt => ProdutosAlt[1] -= 1)
    opWindow()
    makeTable(indiceProdutos, ProdutosAlt, "ResultSearch");
}

function Buscar() {
    let ProdutoResultado = [];
    let buscar = document.getElementById("BuscaTXT").value;
    
    if(buscar == '') {
        opWindow()
        document.getElementById("ResultText").innerHTML = "Insira uma palavra em Buscar antes.";
    } else {
        ProdutoResultado[0] = Produtos.find(Produtos => Produtos[0] == buscar);
        console.log(ProdutoResultado[0])
        if(ProdutoResultado[0] == undefined){
            opWindow()
            document.getElementById("ResultText").innerHTML = "Este produto não existe!";
        } else {
            opWindow()
            makeTable(indiceProdutos, ProdutoResultado, "ResultSearch");
        }
    }
}

function Promotion(){
    let ProdutosOferta = Produtos;
    let x;
    ProdutosOferta.forEach(ProdutosOferta => {
        x = "Atenção, " + ProdutosOferta[0] + " em Promoção!";
        ProdutosOferta[0] = x;
        })

    opWindow()
    makeTable(indiceProdutos, ProdutosOferta, "ResultSearch");
}

function Reposition() {
    Produtos.every(Produtos => Produtos[1] <= 0);
    
    const total = Produtos.reduce((quantidadeTotal, Produtos) => Produtos[1] + quantidadeTotal, 0);
    console.log(total);

    opWindow()
    document.getElementById("ResultText").innerHTML = "Um item está em falta! Você têm " + total + " itens no estoque.";

}

function hiddeModal() {
    document.getElementById("modal_edit").classList.remove("modalOn");
    removeTable();
}

function removeTable(){
    const TableDel = document.getElementById("ResultSearch").children;

    for (let i = TableDel.length - 1; i >= 0; i--){
        TableDel[i].remove();
    }
}

function opWindow(){
    document.getElementById("modal_edit").classList.add("modalOn");
}