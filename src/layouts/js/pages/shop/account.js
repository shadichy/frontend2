// import("./main")
var current_tab = parseInt(localStorage.getItem("current_tab")) || 0,
    rat = (window.innerWidth / window.innerHeight <= 4/3) ? false : true
// window.addEventListener("DOMContentLoaded", () => {

var btn_state=true
let lsbtn=document.querySelector("#container>div:first-child>div:last-child"),
    tgg=document.querySelector("#container>div:first-child>div>svg")

function roq(){
  if (rat) return
  lsbtn.style.height = btn_state ? "0vh" : "26vh"
  tgg.style.rotate = btn_state? "180deg" : "0deg"
  btn_state =!btn_state
}
tgg.onclick = roq

let btn = document.querySelectorAll("#container>div:first-child button"),
    elem = document.querySelectorAll("#container>div:last-child>div>section")
;[].forEach.call(
  btn,
  (pa, ia) =>
    (pa.onclick = () => {
      // ;[].forEach.call(btn, (pc) => pa!=pc && pc.classList.contains("sel") ? pc.classList.remove("sel") : null)
      btn[current_tab].classList.remove("sel")
      pa.classList.add("sel")
      // ;[].forEach.call(e, (pb,ib)=> (ia == ib) ? pb.classList.add("act") : pb.classList.contains("act")?pb.classList.remove("act"):null)
      elem[current_tab].classList.remove("act")
      elem[ia].classList.add("act")
      elem[0].style.marginLeft = `-${ia * 25}%`
      current_tab = ia
      localStorage.setItem("current_tab", `${ia}`)
      roq()
    })
)
btn[current_tab].click()

let catelist=document.querySelector("#container>div:last-child ul"),
    cates=catelist.querySelectorAll("li"),
    current_cate=0,
    is_open=false
// catelist.onclick=()=>{
//   is_open=!is_open
//   if (rat || is_open) return
// }
cates.forEach((cate,i)=>{
  cate.onclick=()=>{
    if (is_open || rat) {
      cates[current_cate].classList.remove("in")
      cate.classList.add("in")
      catelist.style.height= rat ? "fit-content" : "5vh"
      cates[0].style.marginTop = rat ? "0%" : `-${i * 25}%`
      current_cate = i
    } else {
      catelist.style.height="20vh"
      cates[0].style.marginTop = "0%"
    }
    is_open=!is_open
  }
})
// })
window.customfunc.push(() => {
  rat = (window.innerWidth / window.innerHeight <= 4/3) ? false : true
  is_open=true
  cates[current_cate].click()
})
