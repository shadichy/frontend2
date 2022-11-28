var tbh = true
const eScroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  },
  root = document.documentElement

let reqheight = 0,
    reqmin = 0,
    reqmax = 0
const
  isElementInViewport = (e) => {
    let rect = e.getBoundingClientRect(),
      clientHeight = window.innerHeight || document.documentElement.clientHeight
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >=
        clientHeight &&
        rect.top <=
          clientHeight) ||
      (rect.top >= 0 &&
        rect.bottom <=
          clientHeight)
    )
  }

function fscr() {
  let b = window.scrollY
  // @ts-ignore
  document.getElementsByClassName("nav")[0].style.top =
    b == reqheight || (b >= reqmin && b <= reqmax) ? "-10vh" : "0"
  eScroll(fscr)
}

function tscr() {
  let b = window.scrollY
  // @ts-ignore
  document.querySelector("footer>div:first-child>span").style.opacity =
    b == reqheight || (b >= reqmin && b <= reqmax) ? "0" : "1"
  eScroll(tscr)
}
    
// @ts-ignore
window.addEventListener("DOMContentLoaded", e => {
  // @ts-ignore
  document.getElementById("butt").onclick = ()=>{
    let 
      // xtab = document.getElementById("tab"),
      rat = window.innerWidth / window.innerHeight,
      d = []
    if (rat <= 133 / 100) {
      d = ((tbh) ? [100,180,"rgba(255, 255, 255, 0.8)"] : [0,0,"none"])
      // @ts-ignore
      document.querySelector("#butt>svg").style.transform = `rotate(${d[1]}deg)`
      // @ts-ignore
      document.getElementById("butt").style.background = d[2]
      tbh = !tbh
    } else {
      d[0]=40
    }
    // @ts-ignore
    document.getElementById("swipe").style.width = `${d[0]}vw`
  }

  function loop() {
    document.querySelectorAll(".show-on-scroll")
      .forEach((e) => 
        e.classList
          [isElementInViewport(e) ? "add" : "remove"]
            ("is-visible"))
  }

  document.onscroll = loop
  // function languageSelector(slang) {
  //   let content = document.getElementsByClassName("lang-popup"),
  //     selang = document.getElementsByClassName("sl_" + slang)
  //   for (let i = 0; i < content.length; i++) content[i].style.display = "none"
  //   for (let i = 0; i < selang.length; i++) selang[i].style.display = "unset"
  //   tarlang = slang
  // }
  // function relang() {
  //   location.href = location.href.replace(`/${lang}`, `/${tarlang}`)
  // }
  let srl = window.scrollY
  window.scrollTo(0, srl)
  // const elementsToShow = document.querySelectorAll(".show-on-scroll")
  loop()
  root.style.setProperty("--vh", Math.sqrt(innerHeight) + "px")
  window.onresize = () => {
    tbh = !tbh
    root.style.setProperty("--vh", Math.sqrt(innerHeight) + "px")
    window["customfunc"].forEach((f) => f())
  }

  window["customfunc"].forEach((f) => f())
  tscr()
})
