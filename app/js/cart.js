import addGlobalEventListener, { addGlobalEventListenerQS } from "./util/addGlobalEventListener"

const SESSION_STORAGE_KEY_PREFIX = "CART-ITEM-COUNT"


export function cartSetup(){
    initialLoadItems()

    addGlobalEventListenerQS("click", ".product_btngroup-add", incrementItemCount)
    addGlobalEventListenerQS("click", ".product_btngroup-remove", decreaseItemCount)
    addGlobalEventListenerQS("click", ".product_btn-addtocart", addItemsToCart)
    addGlobalEventListener("click", ".cart_item_delete", removeProduct)
}

function initialLoadItems(){
    const sessionItemsQuantityStorage = loadCartSessionItemQuantity()
    if(sessionItemsQuantityStorage == 0) return
    renderCartItems()
}

function incrementItemCount(){
    const productQuantity = document.querySelector(".product_btngroup-countitems")
    let productQuantityValue = productQuantity.innerText
    productQuantityValue ++
    productQuantity.innerText = productQuantityValue
}

function decreaseItemCount(){
    const productQuantity = document.querySelector(".product_btngroup-countitems")
    let productQuantityValue = productQuantity.innerText
    if(productQuantityValue == 0) return
    productQuantityValue --
    productQuantity.innerText = productQuantityValue
}

function addItemsToCart(){
    const productQuantity = document.querySelector(".product_btngroup-countitems")
    const productQuantityValue = productQuantity.innerText
    const currentQuantity = loadCartSessionItemQuantity()
    saveCartSession(productQuantityValue, currentQuantity)
    renderCartItems()
    productQuantity.innerText = 0
}

function removeProduct(){
    sessionStorage.removeItem(SESSION_STORAGE_KEY_PREFIX)
    renderEmptyCart()
}


function saveCartSession(currentQuantity, quantityToAdd){
    const productQuantity = parseInt(currentQuantity) + parseInt(quantityToAdd)
    sessionStorage.setItem(SESSION_STORAGE_KEY_PREFIX, JSON.stringify(productQuantity))
}

function loadCartSessionItemQuantity(){
    return sessionStorage.getItem(SESSION_STORAGE_KEY_PREFIX) || 0
}

const itemsContainer = document.querySelector(".cart_items")
const checkoutBtn = document.querySelector(".cart_checkout")
const itemQuantityHeader = document.querySelector(".header_item-count")
const ITEM_PRICE = 125

function renderCartItems(){
    itemsContainer.innerHTML = ""
    const templateCloneItem = templateItem.content.cloneNode(true)
    const itemQuantity = templateCloneItem.querySelector(".cart_item_quantity")

    const totalPrice = templateCloneItem.querySelector(".cart_total_price")

    const currentQuantity = loadCartSessionItemQuantity()
    itemQuantity.innerText = `x ${currentQuantity}`
    itemQuantityHeader.innerText = currentQuantity

    const totalPriceValue = currentQuantity * ITEM_PRICE
    totalPrice.innerText = `$${totalPriceValue}`
    
    itemsContainer.appendChild(templateCloneItem)
    checkoutBtn.classList.remove("hide")
}

function renderEmptyCart(){
    itemsContainer.innerHTML = "<div class='cart_empty'>Your cart is empty.</div>"
    checkoutBtn.classList.add("hide")
    itemQuantityHeader.innerText = 0
}