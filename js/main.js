

let products = []
let products_cart = []
function init(){
    addProduct("manzana", 100, "manzana roja", 1)
    addProduct("manzana", 150, "manzana verde", 2)
    addProduct("naranaja", 120, "naranja de ombligo", 3)
    addProduct("banana", 200, "banana del ecuador", 4)
    addProduct("tomate", 5, "tomate redondo", 5)
    addProduct("tomate", 100, "tomate perita", 6)
    addProduct("manzana 2", 100, "manzana roja",7)
    addProduct("manzana 2", 150, "manzana verde",8)
    addProduct("naranaja 2", 120, "naranja de ombligo",9)
    addProduct("banana 2", 200, "banana del ecuador", 10)
    addProduct("tomate 2", 50, "tomate redondo", 11)
    addProduct("tomate 2", 100, "tomate perita", 12)
    drawProductsList(products)

    if (localStorage.getItem("cart") != null){
        products_cart = JSON.parse(localStorage.getItem("cart")) 
    } 
    drawCart() 

}


function addProduct(name, price, description, id){
    let product = new Object()
    product.name = name
    product.price = price
    product.description = description
    product.id = id
    products.push(product)
}

function drawProductsList(array_products) {
    $("#product-list").html("")
    let products_length = array_products.length
    for (let i = 0; i < products_length; i++) {
        let product_name = $('<h3>').html(array_products [i].name)
        let product_description = $('<em>').html (array_products[i].description)
        let product_price = $('<div>').html("$" + array_products [i].price.toFixed(2))
            .addClass("text-right")
        let product_button = $('<button>')
            .html("agregar")
            .attr("type", "button")
            .addClass("add-product")
            .attr("data-id", array_products [i].id )
            


        let product_box = $("<div>")
        .addClass("product_box")
        .append(product_name, product_description, product_price, product_button)
        

        let col = $('<div>')
            .addClass("col-sm-3")
            .append(product_box)
        $('#product-list').append(col)

    }
    setListeners()
}
$("#search").on("keyup", function(e){
    let filter_value =  $(this).val()
    let filtered_products = products.filter((value, index) => {
       
        return (value.name.indexOf(filter_value)) > -1
    })
    
    drawProductsList(filtered_products)
})

function setListeners(){
    $(".add-product").click(function(){
        let product_id = $(this).attr("data-id")
        let index = products_cart.findIndex((product)=>{
            return product.id == product_id
        })

        if (index >= 0) 
        {
            products_cart [index].quantity ++
            saveProductCart()
            drawCart()
            return
        }

        let item = products.find((product)=>{
            return product.id == product_id
        })
        item.quantity = 1
        products_cart.push(item)
        saveProductCart()
        drawCart()
    })
}

function saveProductCart(){
    localStorage.setItem("cart", JSON.stringify(products_cart))
}

function drawCart(){
    // todo: add funcion to draw Cart

}

init()


/** 
 * lo que guardamos en el carrito no tiene que ser un producto sino un objeto
 * si ya tengo guardado un objeto, deberia ser cantidad 2
 * dibujar el carrito en algun lugar para tener visualizacion
 * poder borrar productos
*/