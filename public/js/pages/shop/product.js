// import("./main")

// const { shopitem, subcall } = require("./global")

// @ts-ignore
const fac = new FastAverageColor()

let json_product_template = {
  name: "name of product",
  price: {
    original: 100,
    discount: 50,
  },
  types: ["black", "blue"],
  maxcount: 192,
  images: [
    "/res/img/product/1.jpg",
    "/res/img/product/2.jpg",
    "/res/img/product/3.jpg",
    "/res/img/product/4.jpg",
    "/res/img/product/5.jpg",
  ],
  description: "description of product",
  tags: ["tag1", "tag2", "tag3"],
}

function seltype(no) {
  let elem = document.querySelectorAll("#product div#type>section>span")
  for (let i = 0; i < elem.length; i++) {
    if (i == no) {
      elem[no].classList.add("tselected")
      continue
    }
    elem[i].classList.remove("tselected")
  }
}
function changeBackgound(url) {
  let image = document.querySelector("#product>section:first-child>div>section")
  // @ts-ignore
  image.style.backgroundImage = `url(${url})`
  fac
    .getColorAsync(url)
    .then((color) => {
      // @ts-ignore
      image.style.backgroundColor = color.rgba
    })
    .catch((e) => {
      console.log(e)
    })
}

window["customfunc"].push(() => {
  // @ts-ignore
  document.querySelector("#related>div").style.gridTemplateColumns = `repeat(${
    innerWidth > innerHeight
      ? Math.floor((innerWidth * 4) / innerHeight) - 1
      : Math.ceil((innerWidth * 4) / innerHeight)
  },1fr)`
  document
    .querySelectorAll("#product>section>div#img>div#imglist>div>img")
    // @ts-ignore
    .forEach((e) => (e.onmouseover = () => changeBackgound(e.src)))
  document
    .querySelectorAll("#product>section>div#ras>div#type>section>span")
    // @ts-ignore
    .forEach((e, k) => (e.onclick = () => seltype(k)))
})

// window.addEventListener("DOMContentLoaded", () => {
// subcall()
seltype(0)
changeBackgound("/res/img/the2.png")

const productCount = document.getElementById("pcount"),
  productCountBtn = document.querySelectorAll("#product div#count>div>span")

// @ts-ignore
let productCountValue = parseInt(productCount.value);

// @ts-ignore
productCount.addEventListener("change", () => {
  if (productCountValue > json_product_template.maxcount)
    // @ts-ignore
    productCount.value = json_product_template.maxcount
  // @ts-ignore
  if (productCountValue < 1) productCount.value = 1
})
productCountBtn[0].addEventListener("mouseup", () => {
  // @ts-ignore
  if (productCountValue > 1) productCount.value--
})
productCountBtn[1].addEventListener("mouseup", () => {
  // @ts-ignore
  if (productCountValue < json_product_template.maxcount) productCount.value++
})
// })

window["customfunc"].forEach((f) => f())
