// const { shopitem, subcall } = require("./global")

const elem = document.querySelectorAll(
  "#product_list>div>section:first-child>button"
)
function hili(no) {
  for (let i = 0; i < elem.length; i++) {
    if (i == no) {
      elem[no].classList.add("onhili")
      continue
    }
    elem[i].classList.remove("onhili")
  }
  if (no != 3) elem[3].querySelector("p").innerHTML = price
}

function sortByPrice(mode) {
  elem[3].blur()
  elem[3].querySelector("p").innerHTML = mode == 0 ? priceUp : priceDown
  hili(3)
}

window.customfunc.push(() => {
  document.querySelector(
    "#product_list>div:last-child>section:last-child"
  ).style.gridTemplateColumns = `repeat(${
    Math[window.innerWidth / window.innerHeight > 1.33 ? "floor" : "round"](
      (window.innerWidth / window.innerHeight + 0.1) * 2
    ) + 1
  },1fr)`
  let cate = document.querySelector("#product_list>div:first-child")
  document.querySelector("#product_list>div>section:first-child>svg").onclick =
    () => {
      cate.style.width = "100vw"
      cate.style.left = "0"
    }
  document.querySelector(
    "#product_list>div:first-child>div>span>svg:last-child"
  ).onclick = () => {
    cate.style.width = "50vw"
    cate.style.left = "-50vw"
  }
  let flac = document.querySelectorAll(
    "#product_list>div:nth-child(2)>section:first-child>button"
  )
  for (let i = 0; i < 3; i++) flac[i].onclick = () => hili(i)
  flac[3]
    .querySelectorAll("span>p")
    .forEach((v, k) => (v.onclick = () => sortByPrice(k)))
})

hili(0)

window.customfunc.forEach((f) => f())
