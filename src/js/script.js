const categories = {
    "Hortifruti"   : "fruta",
    "Laticinios"   : "leite",
    "Panificadora" : "pães"
}

//CRIA TAGS HTML DOS CARDS
function createTags (){
    let li   = document.createElement("li")
    let img  = document.createElement("img")
    let h3   = document.createElement("h3")
    let span = document.createElement("span")
    let p    = document.createElement("p")

    return {
        li,
        img,
        h3,
        p,
        span
    }
}


//CALCULA A SOMA TOTAL DOS PRODUTOS DE CADA CATEGORIA
function sumValues (produtos){
    let total = produtos.reduce((total, produto) =>{
        return total + produto.preco
    }, 0)

    document.querySelector("#precoTotal").innerText = total.toFixed(2)
}

//CRIA OS CARDS 
function renderItems (produtos){
    sumValues(produtos)
    produtos.forEach((produto) =>{
        let {li, img, h3, p, span} = createTags()
        let ul = document.querySelector(".listProdutos")

        img.setAttribute("src", produto.img)
        h3.innerText   = produto.nome
        span.innerText = produto.secao
        p.innerText    = `R$ ${produto.preco.toFixed(2)}`

        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(span)
        li.appendChild(p)

        ul.appendChild(li)
    })
}


//FILTRA PRODUTOS POR CATEGORIA
function filterCategory (event){
    let category = event.target.classList[1].split("--")[1].split("filtrar")[1]
    if(category == "Todos"){
        document.querySelector(".listProdutos").innerHTML = ""
        renderItems(produtos)
        return 
    }

    let filteredProducts      = produtos.filter(produto => {
        return produto.categoria.toLowerCase() == categories[category]
    }) 

    document.querySelector(".listProdutos").innerHTML = ""
    renderItems(filteredProducts)
}


//FILTRA PRODUTOS PELA BUSCA POR NOME
function searchName (event){
    let text             = event.target.value
    let filteredProducts = produtos.filter(produto => {
        return produto.nome.toLowerCase().includes(text.toLowerCase())
    })
    document.querySelector(".listProdutos").innerHTML = ""
    renderItems(filteredProducts)
}


//ADICIONA EVENTOS NO INPUT E NOS BOTÕES
document.querySelector(".campoBuscaPorNome").addEventListener("keyup", searchName)
document.querySelectorAll(".estiloGeralBotoes").forEach( botao => botao.addEventListener("click", filterCategory))
renderItems(produtos)






