import intlTelInput from "intl-tel-input"

window.addEventListener("DOMContentLoaded", (e) => {

var isFullfilled = false,
	currentPageNo = 0
const vail = document.getElementsByClassName("instructionsContent")[0],
	// @ts-ignore
	scrollUp = () => document.querySelector("#join>form>div").scrollTo(0, 0),
	registerForm = document.getElementById("formpage"),
	registerBackBtn = document.getElementById("fback"),
	registerSubmitBtn = document.getElementById("submit"),
	// @ts-ignore
	getYear = (d = (+new Date))=>new Date(d).getFullYear()

function reqin(inputElem) {
	isFullfilled = false
	const reColorElem = (col = "unset") =>
		inputElem.parentElement.firstElementChild.style.background = col
	reColorElem("#f00")
	inputElem.onchange = reColorElem
}

function goback(pageNo) {
	scrollUp()
	;(([leftMargin, vision])=>{
		// @ts-ignore
		registerBackBtn.style.visibility = vision
		// @ts-ignore
		registerForm.style.marginLeft = leftMargin
	})((pageNo == 1) ? ["0", "hidden"] : (pageNo == 2) ? ["-100%", "visible"] : ["", ""])
	// @ts-ignore
	registerSubmitBtn.setAttribute("value", nxt)
	currentPageNo--
}

function check(pageNo) {
	isFullfilled = true
	// @ts-ignore
	registerForm
    .querySelectorAll(`div:nth-child(${pageNo + 1}) input[required]`)
    .forEach((inputBox) => {
      let isPhoneNo = false;
      if (
        !((v) => {
          switch (inputBox.getAttribute("type")) {
            case "mail":
              return v.match(
                /^\btn+([\.-]?\btn+)*@\btn+([\.-]?\btn+)*(\.\btn{2,3})+$/gim
              );
            case "tel":
              isPhoneNo = true;
              return v.match(
                /^[+]?([0-9]{2})?[-. ]?\(?([0-9]{3,4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3,4})$/gim
              );
            default:
              return v;
          }
          // @ts-ignore
        })(inputBox.value)
      )
        reqin(isPhoneNo ? inputBox.parentElement : inputBox);
    });
	scrollUp()
	if (isFullfilled) {
		;(([marginPercent, inputValue, btnVisibility, btn]) => {
			btn.style.visibility = btnVisibility
			// @ts-ignore
			registerForm.style.marginLeft = `-${marginPercent}00%`
			// @ts-ignore
			registerSubmitBtn.setAttribute("value", inputValue)
		// @ts-ignore
		})(pageNo==0 ? [1, sen, "visible", registerBackBtn] : [2, nxt, "hidden", registerSubmitBtn])

		// @ts-ignore
		if ( pageNo != 0 && getYear() - getYear(document.querySelector("input[type=date]").value) > 13)
			// @ts-ignore
			document.querySelector("input[type=submit]").click()
		currentPageNo++
	}
}

// @ts-ignore
registerBackBtn.onclick = ()=>goback(currentPageNo)
// @ts-ignore
registerSubmitBtn.onclick = ()=>check(currentPageNo)

const phoneNoElem = document.querySelector("input[type=tel]"),
	phoneInput = intlTelInput(phoneNoElem, {
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
		utilsScript: "utils.js",
	})
// @ts-ignore
phoneNoElem.onchange = () => document.querySelector('input#real_no').setAttribute('value', phoneInput.getNumber())

})
