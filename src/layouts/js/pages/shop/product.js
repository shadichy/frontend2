// import("./main")

// const { shopitem, subcall } = require("./global")

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
function changebg(url) {
  let image = document.querySelector("#product>section:first-child>div>section")
  image.style.backgroundImage = `url(${url})`
  fac
    .getColorAsync(url)
    .then((color) => {
      image.style.backgroundColor = color.rgba
    })
    .catch((e) => {
      console.log(e)
    })
}

window["customfunc"].push(() => {
  document.querySelector("#related>div").style.gridTemplateColumns = `repeat(${
    innerWidth > innerHeight
      ? Math.floor((innerWidth * 4) / innerHeight) - 1
      : Math.ceil((innerWidth * 4) / innerHeight)
  },1fr)`
  document
    .querySelectorAll("#product>section>div#img>div#imglist>div>img")
    .forEach((e) => (e.onmouseover = () => changebg(e.src)))
  document
    .querySelectorAll("#product>section>div#ras>div#type>section>span")
    .forEach((e, k) => (e.onclick = () => seltype(k)))
})

// window.addEventListener("DOMContentLoaded", () => {
// subcall()
seltype(0)
changebg("/res/img/the2.png")

const pcount = document.getElementById("pcount"),
  pcount_btn = document.querySelectorAll("#product div#count>div>span")

pcount.addEventListener("change", () => {
  if (pcount.value > json_product_template.maxcount)
    pcount.value = json_product_template.maxcount
  if (pcount.value < 1) pcount.value = 1
})
pcount_btn[0].addEventListener("mouseup", () => {
  if (pcount.value > 1) pcount.value--
})
pcount_btn[1].addEventListener("mouseup", () => {
  if (pcount.value < json_product_template.maxcount) pcount.value++
})
// })

window["customfunc"].forEach((f) => f())
