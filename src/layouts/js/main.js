var tbh = true
const 
  root = document.documentElement,
  lmao = true

// @ts-ignore
window.eScroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

// @ts-ignore
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

function tscr() {
  let b = window.scrollY
  // @ts-ignore
  document.querySelector("footer>div:first-child>span").style.opacity =
    b == reqheight || (b >= reqmin && b <= reqmax) ? "0" : "1"
  // @ts-ignore
  eScroll(tscr)
}

window.addEventListener("DOMContentLoaded", e => {
  const butt = document.getElementById("butt")
  // @ts-ignore
  butt.onclick = ()=>{
    let rat = window.innerWidth / window.innerHeight
    ;(([d0, d1, d2])=>{
      if (rat <= 133 / 100) {
        // @ts-ignore
        document.querySelector("#butt>svg").style.transform = `rotate(${d1}deg)`
        // @ts-ignore
        butt.style.background = d2
        tbh = !tbh
      }
      // @ts-ignore
      document.getElementById("swipe").style.width = `${d0}vw`
    })((rat <= 133 / 100) ? (tbh) ? [100, 180, "rgba(255, 255, 255, 0.8)"] : [0, 0, "none"] : [40])
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
