import  {myData} from "./data";
const productContainer = document.getElementById("product")
const orderSection = document.getElementById("order-section")
const showOrder = document.getElementById("showOrder")
const totalPrice = document.getElementById("totalPrice")
let addedItems = []
function renderData(arr){
    return arr.map(element=>{
        const {image,name,ingredient,price,uuid} = element
        return `
            <div class="product" >
               <div class="items">
                   <div class="item-description">
                       <img src="images/${image}" alt="pizza">
                       <div class="details">
                           <h3 class="name">${name}</h3>
                           <p class="ingredient">${ingredient}</p>
                           <p class="price">$${price}</p>
                       </div>
                   </div>
                   <div class="plus-icon" id="add-item-${uuid}" data-item="${uuid}">+</div>
               </div>
           </div>
         `
    }).join("")

}
productContainer.innerHTML = renderData(myData)

document.addEventListener("click", handleEvent)

function  handleEvent(e){
    if(e.target.dataset.item){
       addItems(e.target.dataset.item)
         orderSection.innerHTML =`<h3>Your order</h3>` + renderList()
        totalPrice.textContent= renderTotal()
    }if(e.target.id==="order"){
        completeOrder()
    }if(e.target.id==="pay"){
        e.preventDefault()
        pay()
    }if(e.target.id==="remove"){
        removeItem(e.target.dataset.remove)
        orderSection.innerHTML =`<h3>Your order</h3>` + renderList()
        totalPrice.textContent= renderTotal()

    }
}
function addItems(itemId){
       myData.forEach(function (item){
       if(item.uuid === itemId){
           //checking if already exist =
           const exist = addedItems.find(i=> i.uuid===itemId)
           if(addedItems.find(i=> i.uuid===itemId)){
                exist.count++
           }else{
               addedItems.push(
                   {
                       name:item.name,
                       price:item.price,
                       uuid:item.uuid,
                       count: 1
                   }
               )
           }
       }
    })
}

function renderList() {
    if(addedItems.length===0){
        showOrder.classList.add('hidden')
    }else{
        showOrder.classList.remove("hidden")

       return  addedItems.map(function (list){
           return (`
                     <div class="order-item-div">
                       <div class="order-name">
                           <h3 class="name">${list.name}</h3>
                           <p class="ingredient" id="remove" data-remove="${list.uuid}">remove</p>
                       </div>
                       <p class="price">${list.price} x ${list.count}</p>
                     </div>
                     
                    `)
        }).join("")
    }
}
renderList()
function renderTotal(){
   return addedItems.reduce(function (total,current){

        return total+(current.price* current.count)
    },0)
}
const overLay = document.getElementById("overlay")
const banner = document.getElementById("pay-banner")
function completeOrder(){

    overLay.classList.remove("hidden")
    banner.classList.remove("hidden")
}

function  removeItem(itemId){
   const check = addedItems.find((item)=> item.uuid ===itemId )
    if(check && check.count>1){
        check.count--
    }else{
        addedItems = addedItems.filter(i => i.uuid !==itemId)

    }

}

function  pay(){
    let userName = document.getElementById("user-name")
    const orderMessage = ` 
                                <div class="order-message" id="order-message">
                                    <p>Thanks, ${userName.value}! Your order is on its way!</p>
                                </div>`
    if(userName.value){
        showOrder.innerHTML = `${orderMessage}`
        overLay.classList.add("hidden")
        banner.classList.add("hidden")

    }

}

