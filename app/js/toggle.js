import { addGlobalEventListenerQS } from "./util/addGlobalEventListener.js"

export function mobileMenuToggle(){
    addGlobalEventListenerQS("click", "#btnHamburger", () => {
        const header = document.querySelector(".header")
        header.classList.toggle("open")
    })
}

export function cartToggle(){
    addGlobalEventListenerQS("click", ".header_cart_icon", () => {
        const cart = document.querySelector(".cart")
        cart.classList.toggle("open")
    })
}

