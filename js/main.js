// CRUD SYSTEM part 2 (COMPLETED):- 

var nameInput = document.getElementById("productName")
var priceInput = document.getElementById("productPrice")
var categoryInput = document.getElementById("productCategory")
var saleInput = document.getElementById("productSale")
var descInput = document.getElementById("productDescription")
var searchInput = document.getElementById("searchInput")
var nameAlert = document.getElementById("alertName")
var priceAlert = document.getElementById("alertPrice")

var currentIndex = 0
var productList;

if(localStorage.getItem("list") != null){
    productList = JSON.parse(localStorage.getItem("list"))
    displayData()
}
else{
    productList= []
}

function addProduct(){

    if(validateName()== true && validatePrice() == true){
        var product = {
            name : nameInput.value ,
            price : priceInput.value ,
            category : categoryInput.value ,
            sale : saleInput.checked ,
            description : descInput.value
        }
    
        productList.push(product)
    
        localStorage.setItem("list",JSON.stringify(productList))
    
        displayData()
    }
   
}

function deleteProduct(x){
    productList.splice(x,1)
    localStorage.setItem("list", JSON.stringify(productList))
    displayData()
}

function updateProduct(y){

    currentIndex = y

    nameInput.value = productList[y].name
    priceInput.value = productList[y].price
    categoryInput.value = productList[y].category
    saleInput.checked = productList[y].sale
    descInput.value = productList[y].description
    document.getElementById("addData").classList.add("d-none")
    document.getElementById("editData").classList.remove("d-none")
}

function addEdit(){

    if(validateName()== true && validatePrice() == true){

        productList[currentIndex].name = nameInput.value
        productList[currentIndex].price = priceInput.value 
        productList[currentIndex].category = categoryInput.value
        productList[currentIndex].sale = saleInput.checked
        productList[currentIndex].description = descInput.value
    
        localStorage.setItem("list", JSON.stringify(productList))
        displayData()
        document.getElementById("addData").classList.remove("d-none")
        document.getElementById("editData").classList.add("d-none")
        clearform()
    }
}


function displayData(){
    console.log(productList);
    var temp = '';
    for (var i = 0 ; i < productList.length ; i++){
        temp += `<tr>
        <td> ` + (i + 1) + ` </td>
        <td>`+ productList[i].name +`</td>
        <td> `+ productList[i].price +` </td>
        <td>`+ productList[i].category +`</td>
        <td>`+ productList[i].sale +`</td>
        <td>`+ productList[i].description +`</td>
        <td>

            <button onclick="updateProduct(`+i+`)" class="btn btn-warning">update</button>
        </td>
        <td>
            <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button>
        </td>
    </tr>`
    }
    document.getElementById("test").innerHTML = temp
}

function clearform(){
    nameInput.value = ""
    priceInput.value = ""
    categoryInput.value = "tv"
    saleInput.checked = false
    descInput.value = ""

    nameInput.classList.remove("is-invalid")
    nameInput.classList.remove("is-valid")
    priceInput.classList.remove("is-invalid")
    priceInput.classList.remove("is-valid")

    priceAlert.classList.add("d-none")
    nameAlert.classList.add("d-none")
}

function search(){

    var searchVal = searchInput.value.toLowerCase()
    var temp = ""
    
    for( var i = 0 ; i < productList.length ; i ++){

        if( productList[i].name.toLowerCase().startsWith(searchVal) == true){
            temp += `<tr>
            <td> ` + i + ` </td>
            <td>`+ productList[i].name.replace(searchVal , "<span class='text-warning'>"+searchVal+"</span>") +`</td>
            <td> `+ productList[i].price +` </td>
            <td>`+ productList[i].category +`</td>
            <td>`+ productList[i].sale +`</td>
            <td>`+ productList[i].description +`</td>
            <td>
    
            <button onclick="updateProduct(`+i+`)" class="btn btn-warning">update</button>
            </td>
            <td>
                <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button>
            </td>
        </tr>`
        }
    }

    document.getElementById("test").innerHTML = temp

}



// -----------------------R E G E X----------------------------------------

function validateName(){

    var regexName = /^[a-zA-Z]{4,10} .{1,20}?$/;

    if(regexName.test(nameInput.value) == true){
        return true
    }
    else{
        return false ;     
    }
}

function validatePrice(){

    var regaxPrice = /^[1-9]{1}[0-9]{3,5}$/ ;

    if (regaxPrice.test(priceInput.value)== true){
        return true
    }
    else{
        return false
    }
}

// -----------------------Validation----------------------------------------

nameInput.addEventListener( "keyup" , function(){

    if(validateName() == true ){
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        nameAlert.classList.add("d-none")
    }
    else if(validateName() != true){
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        nameAlert.classList.remove("d-none")
    }
    
})

priceInput.addEventListener("keyup" , function(){

    if(validatePrice()== true){
        priceInput.classList.add("is-valid")
        priceInput.classList.remove("is-invalid")
        priceAlert.classList.add("d-none")
    }
    else if(validatePrice() != true){
        priceInput.classList.add("is-invalid")
        priceInput.classList.remove("is-valid")
        priceAlert.classList.remove("d-none")
    }
})