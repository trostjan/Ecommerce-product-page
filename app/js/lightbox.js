import addGlobalEventListener from "./util/addGlobalEventListener.js"

export function setFeaturedItem(){
    addGlobalEventListener("click", "[data-featured]", e => {
        if(e.target.dataset.featured == "active") return
    
        const featuredImage = e.target
        const previousFeaturedImage = document.querySelector("[data-featured = 'active']")
    
        previousFeaturedImage.dataset.featured = ""
        featuredImage.dataset.featured = "active"
    
        setCurrentFeaturedImage(featuredImage)
    })

    function setCurrentFeaturedImage(featuredImage){
        const featuredImageSrc = featuredImage.src
        const featuredImageContainer = document.querySelector(".product_images-featured")
        featuredImageContainer.src = featuredImageSrc
    }
}




