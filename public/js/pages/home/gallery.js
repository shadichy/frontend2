
let imgCountLimit = 4,
  n = 0, // update when resize or load
  galleryContainer = document.getElementsByClassName("imgal"),
  inih = document.querySelector("#view"),
  alin = true,
  // @ts-ignore
  gallDBurl = dburl.replace("arli", "gallery"),
  k = 0,
  f = false,
  l = 1,
  down = true,
  d = k - 1,
  prevx = 0,
  x = 0,
  found = false
const nav = (()=>document.getElementsByClassName("nav")[0])()
function resize() {
  let rat = window.innerWidth / window.innerHeight
  k = Math.round(rat * 2)
  d = k - 1
  if (k == 0) k = 1
  // @ts-ignore
  galleryContainer[0].style.gridTemplateColumns = `repeat(${k}, 1fr)`
  // @ts-ignore
  root.style.setProperty("--grid-height", k)
  imgCountLimit = 2 * k
}
function brm() {
  let mx = galleryContainer[0].querySelectorAll("div")
  for (let i = 0; i < mx.length; i++) {
    if (mx[i].classList.contains("cts")) {
      mx[i].classList.add("gal")
      mx[i].classList.remove("cts")
    }
  }
  // @ts-ignore
  document.getElementsByClassName("xbu")[0].style.display = "none"
  // @ts-ignore
  nav.style.top = "0"
}
function move(e, s) {
  brm()
  bsel(s)
  e.stopPropagation ? 
    e.stopPropagation() : 
    e.cancelBubble = true
}
function bsel(i) {
  let my = document.querySelectorAll(".xbu>div>span"),
    mx = galleryContainer[0].querySelectorAll("div"),
    xbu = document.getElementsByClassName("xbu"),
    ipl = (i + 1 >= mx.length - 2) ? 0 : i + 1,
    imn = (i - 1 < 0) ? mx.length - 2 : i - 1
  // if (rat > 133 / 100) {
  // @ts-ignore
  nav.style.top = "-10vh"
  mx[i].classList.add("cts")
  mx[i].classList.remove("gal")
  // @ts-ignore
  xbu[0].style.display = "block"
  // @ts-ignore
  my[0].onclick = (e) => {
    move(e, imn)
  }
  // @ts-ignore
  my[1].onclick = (e) => {
    move(e, ipl)
  }
  // }
}
window["fgal"] = {
  bsel,
  brm,
}

const urlParams = new URLSearchParams(location.search)
// function waitimg(){
// 	load(0)
// 	if (!urlParams.get("id")) return
// 	if (!document.getElementById(urlParams.get("id"))) return
// 	document.getElementById(urlParams.get("id")).click()
// }

var end = false,
  ltask = false,

offset = 0

function load(limit) {
  // add a spinner to galleryContainer
  if (end || ltask) return
  ltask = true
  for (let i = offset; i < offset + limit; i++) {
    // console.log("new empty " + (i))
    galleryContainer[0].innerHTML += `<div class="gal loading" id="gallitem${i}" onclick="window.fgal.bsel(${i})"><div>
<span><img src="/res/img/spinner.png" alt="img/spinner.svg"/>
</span></div></div>`
  }
  //ooh
  // @ts-ignore
  fetch(gallDBurl + `?offset=${offset}&limit=${limit}&lang=${lang}`)
    .then((response) => response.json())
    .then((data) => {
      const suboffset = offset
      for (
        let i = 0;
        i < (data.items.length <= limit ? data.items.length : limit);
        i++
      ) {
        offset++
        // console.log("finish " + (suboffset + i)) // nah imma afk for a while
        const dtm = new Date(data.items[i].date * 1000),
          imgElem = document.getElementById("gallitem" + (suboffset + i))
        // imgElem.setAttribute("id",data.items[i]["_id"])
        // @ts-ignore
        imgElem.innerHTML =
          // Mirgration
          `<div><span>
<img src="${data.items[i].src}" alt=""/>
</span><div><h1>${data.items[i].title}</h1>
<p>${dtm.getDate()}/${dtm.getMonth() + 1}/${dtm.getFullYear()}</p>
<p>${
            data.items[i].content
          // @ts-ignore
          }</p><button onclick='navigator.clipboard.writeText("https://teamfuho.net/images/${lang}/${
            data.items[i]["_id"]
          // @ts-ignore
          }");this.innerHTML="${copied}"'>${share}</button></div></div>`.trim()
        // delete class loading of parent
        // @ts-ignore
        imgElem.classList.remove("loading")
        if (
          x == 0 ||
          ((x - prevx) % (4 * (k == 3 ? d : d + 1)) == 0 && f) ||
          (!f && x - prevx == k + 1)
        ) {
          console.log(f, x, prevx, d, l, k)
          f = !f
          // @ts-ignore
          imgElem.style.gridColumn = `${f ? 1 : k - d + 1} / span ${d}`
          // @ts-ignore
          imgElem.style.gridRow = `${l} / span ${d}`
          // @ts-ignore
          imgElem.style.height = "100%"
          l += d + 1
          prevx = x
          if (d == k - 1) down = true
          if (d > 2 && down) d--
          else if (d == 2 && down) down = false
          else if (d < k - 1 && !down) d++
        }
        x++
        if (
          urlParams.get("id") &&
          !found &&
          data.items[i]["_id"] == urlParams.get("id")
        )
          // @ts-ignore
          imgElem.click()
      }

      if (data.items.length != limit) {
        end = true
        //remove every element have class "loading"
        let elements = document.getElementsByClassName("loading")
        while (elements.length > 0) {
          // @ts-ignore
          elements[0].parentNode.removeChild(elements[0])
        }
        // console.log("end", data.items.length, limit)
        return
      }

      ltask = false
    }) // other idea: while loading add an card with a spinner, when load done or error remove that card
}

//let task = false;

// when scroll to the end, fetch gallery
window.onscroll = () => {
  // if scroll near the last element, load limit
  if (
    document.getElementsByClassName("loading").length == 0 &&
    document.getElementsByClassName("gal").length > 0
  ) {
    if (
      document
        .getElementsByClassName("gal")
        [
          document.getElementsByClassName("gal").length - 1
        ].getBoundingClientRect().top < window.innerHeight
    ) {
      load(imgCountLimit)
    }
  }
}
// increase offset, shall we
window.addEventListener("keyup", (e) =>
  e.key == "Escape" || e.code == "Escape" || e.keyCode == 27 ? brm() : () => {}
)

function waitimg() {
  if (!urlParams.get("id")) return
  if (found) return
  if (!ltask) load(9)
  setTimeout(waitimg, 1)
}

window.addEventListener("DOMContentLoaded", (e)=>{
  resize()
  // if (parseInt(urlParams.get("id"))>8) load(parseInt(urlParams.get("id"))+1)
  // else load(9)

  load(9)
  setTimeout(() => {
    // @ts-ignore
    document.getElementsByClassName("he")[0].style.opacity = "0"
    setTimeout(
      // @ts-ignore
      () => (document.getElementsByClassName("he")[0].style.display = "none"),
      500
    )
    // @ts-ignore
    galleryContainer[0].style.opacity = "1"
  }, 3000)
  waitimg()
})
