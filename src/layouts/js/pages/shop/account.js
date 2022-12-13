// @ts-ignore
var current_tab = parseInt(localStorage.getItem("current_tab")) || 0,
  rat = window.innerWidth / window.innerHeight <= 4 / 3 ? false : true;
window.addEventListener("DOMContentLoaded", () => {
  var btn_state = true;
  let lsbtn = document.querySelector(
      "#container>div:first-child>div:last-child"
    ),
    rotateBtn = document.querySelector("#container>div:first-child>div>svg");

  function rotateByDeg() {
    if (rat) return;
    (([height, deg]) => {
      // @ts-ignore
      lsbtn.style.height = height;
      // @ts-ignore
      rotateBtn.style.rotate = deg;
    })(btn_state ? ["0vh", "180deg"] : ["26vh", "0deg"]);
    btn_state = !btn_state;
  }
  // @ts-ignore
  rotateBtn.onclick = rotateByDeg;

  let tabBtns = document.querySelectorAll("#container>div:first-child button"),
    elem = document.querySelectorAll("#container>div:last-child>div>section");
  [].forEach.call(
    tabBtns,
    (pButton, offsetIndex) =>
      (pButton.onclick = () => {
        // ;[].forEach.call(tabBtns, (pc) => pButton!=pc && pc.classList.contains("sel") ? pc.classList.remove("sel") : null)
        tabBtns[current_tab].classList.remove("sel");
        pButton.classList.add("sel");
        // ;[].forEach.call(e, (pb,ib)=> (offsetIndex == ib) ? pb.classList.add("act") : pb.classList.contains("act")?pb.classList.remove("act"):null)
        elem[current_tab].classList.remove("act");
        elem[offsetIndex].classList.add("act");
        // @ts-ignore
        elem[0].style.marginLeft = `-${offsetIndex * 25}%`;
        current_tab = offsetIndex;
        localStorage.setItem("current_tab", `${offsetIndex}`);
        rotateByDeg();
      })
  );
  // @ts-ignore
  tabBtns[current_tab].click();

  let categoryList = document.querySelector("#container>div:last-child ul"),
    // @ts-ignore
    categories = categoryList.querySelectorAll("li"),
    current_cate = 0,
    is_open = false;
  categories.forEach((cate, offsetIndex) => {
    cate.onclick = () => {
      if (is_open || rat) {
        categories[current_cate].classList.remove("in");
        cate.classList.add("in");
        // @ts-ignore
        categoryList.style.height = rat ? "fit-content" : "5vh";
        categories[0].style.marginTop = rat ? "0%" : `-${offsetIndex * 25}%`;
        current_cate = offsetIndex;
      } else {
        // @ts-ignore
        categoryList.style.height = "20vh";
        categories[0].style.marginTop = "0%";
      }
      is_open = !is_open;
    };
  });

  window["customfunc"].push(() => {
    rat = window.innerWidth / window.innerHeight <= 4 / 3 ? false : true;
    is_open = true;
    categories[current_cate].click();
  });
});
