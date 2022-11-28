let fullfill = false

var submitpoint = 0

window.addEventListener("DOMContentLoaded", (e)=>{
const vail = document.getElementsByClassName("instructionsContent")[0],
  // @ts-ignore
  scrup = () => document.querySelector("#form>form>div").scrollTo(0, 0),
  formpage = document.getElementById("formpage"),
  fback = document.getElementById("fback"),
  fsub = document.getElementById("submit")

// { intlTelInput } =
function reqin(elem, a) {
  fullfill = false
  let rev = elem[a]
  if (elem[a].getAttribute("type") == "tel") rev = elem[a].parentElement
  const relem = (col) =>
    (rev.parentElement.firstElementChild.style.background = col)
  relem("#f00")
  elem[a].onchange = () => {
    relem("")
  }
}

function goback(p) {
  scrup()
  let x, y
  if (p == 1) {
    x = "0"
    y = "hidden"
  } else if (p == 2) {
    x = "-100%"
    y = "visible"
    // @ts-ignore
    fsub.style.visibility = "visible"
  }
  // @ts-ignore
  fsub.setAttribute("value", nxt)
  // @ts-ignore
  fback.style.visibility = y
  // @ts-ignore
  formpage.style.marginLeft = x
  // @ts-ignore
  submitpoint--
}

function check(p) {
  fullfill = true
  let reqinp = document.querySelectorAll(
    `#formpage>div:nth-child(${p + 1}) input[required]`
  )
  // console.log(reqinp.length)
  for (let i = 0; i < reqinp.length; i++) {
    switch (reqinp[i].getAttribute("type")) {
      case "mail":
        if (
          // @ts-ignore
          !reqinp[i].value.match(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          )
        )
          reqin(reqinp, i)
        break
      case "tel":
        if (
          // @ts-ignore
          !reqinp[i].value.match(
            /^[+]?([0-9]{2})?[-. ]?\(?([0-9]{3,4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3,4})$/
          )
        )
          reqin(reqinp, i)
        break
      default:
        // @ts-ignore
        if (!reqinp[i].value) reqin(reqinp, i)
        break
    }
  }
  scrup()
  if (fullfill) {
    // console.log(true)
    let x, y
    if (p == 0) {
      // @ts-ignore
      ;(x = "-100%"), (y = sen)
      // @ts-ignore
      fback.style.visibility = "visible"
    } else {
      // @ts-ignore
      ;(x = "-200%"), (y = nxt)
      // @ts-ignore
      fsub.style.visibility = "hidden"
      if (
        new Date().getFullYear() -
          parseFloat(
            // @ts-ignore
            document.querySelector("input[type=date]").value.slice(0, 4)
          ) >
        13
      ) {
        // @ts-ignore
        document.querySelector("input[type=submit]").click()
      }
    }
    // @ts-ignore
    formpage.style.marginLeft = x
    // @ts-ignore
    fsub.setAttribute("value", y)
    // @ts-ignore
    submitpoint++
  }
}

// @ts-ignore
document.querySelector("input[type=button]#fback").onclick = ()=>goback(submitpoint)
// @ts-ignore
document.querySelector("input[type=button]#submit").onclick = ()=>check(submitpoint)

fetch("/avail")
  .then((resp) => resp.json())
  .then((data) => {
    // @ts-ignore
    let ct = Math.ceil(new Date() / 1000)

    if (ct >= data[0]) {
      // @ts-ignore
      vail.innerHTML = ((ct > data[0] + data[1] * 60) ? noavail : avail)
    } else {
      let sleft = data[0] - ct
      if (sleft < 12 * 3600) {
        // @ts-ignore
        vail.innerHTML = soonavail
        let ctm = document.getElementById("counttime")
        // @ts-ignore
        // ctm.innerHTML =  (sleft < 3600) ? Math.floor(sleft / 60) + "m" : Math.floor(sleft / 3600) + "h"
        // @ts-ignore
        ctm.innerHTML =  (([g,t]) => Math.floor(sleft / (60*g)) + t)((sleft < 3600) ? [1,"m"] : [60,"h"])
      } else {
        // @ts-ignore
        vail.innerHTML = willavail
        let cts = new Date(data[0] * 1000),
          cte = new Date((data[0] + data[1] * 60) * 1000)
        // @ts-ignore
        document.getElementById("starttime").innerHTML =
          cts.getHours() + ":" + cts.getMinutes()
        // @ts-ignore
        document.getElementById("endtime").innerHTML =
          cte.getHours() + ":" + cte.getMinutes()
        // @ts-ignore
        document.getElementById("date").innerHTML = `${cts.getDate()}/${
          cts.getMonth() + 1
        }/${cts.getFullYear()}`
      }
    }
    // vail.innerHTML = (data ? noavail : avail)
  })
  // @ts-ignore
  .catch((e) => {
    // @ts-ignore
    vail.innerHTML = noavail
  })

// window.addEventListener("DOMContentLoaded", ()=>{
// @ts-ignore
const telem = document.querySelector("input[type=tel]"),
// @ts-ignore
  phoneInput = intlTelInput(telem, {
    preferredCountries: [
      "vn",
      "la",
      "bd",
      "mm",
      "my",
      "sg",
      "bn",
      "id",
      "ph",
      "cn",
    ],
    utilsScript: "/upload/intl-utils.js",
  })
// @ts-ignore
telem.onchange = ()=>document.querySelector('input#real_no').setAttribute('value',phoneInput.getNumber())

})
// })
