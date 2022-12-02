import intlTelInput from "intl-tel-input"

window.addEventListener("DOMContentLoaded", (e) => {

var fullfill = false,
	submitpoint = 0
const vail = document.getElementsByClassName("instructionsContent")[0],
	// @ts-ignore
	scrup = () => document.querySelector("#form>form>div").scrollTo(0, 0),
	formpage = document.getElementById("formpage"),
	fback = document.getElementById("fback"),
	fsub = document.getElementById("submit"),
	// @ts-ignore
	getYear = (d = (+new Date))=>new Date(d).getFullYear()

function reqin(e) {
	fullfill = false
	const relem = (col = "unset") =>
		e.parentElement.firstElementChild.style.background = col
	relem("#f00")
	e.onchange = relem
}

function goback(p) {
	scrup()
	;(([x,y])=>{
		// @ts-ignore
		fback.style.visibility = y
		// @ts-ignore
		formpage.style.marginLeft = x
	})((p == 1) ? ["0", "hidden"] : (p == 2) ? ["-100%", "visible"] : ["", ""])
	// @ts-ignore
	fsub.setAttribute("value", nxt)
	submitpoint--
}

function check(p) {
	fullfill = true
	document
		.querySelectorAll(`#formpage>div:nth-child(${p + 1}) input[required]`)
		.forEach((e)=>{
			let isNo = false
			if (!((v)=>{
				switch (e.getAttribute("type")) {
					case "mail":
						return v.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gim)
					case "tel":
						isNo = true
						return v.match(/^[+]?([0-9]{2})?[-. ]?\(?([0-9]{3,4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3,4})$/gim)
					default:
						return v
				}
			// @ts-ignore
			})(e.value))
				reqin(isNo ? e.parentElement : e)
		})
	scrup()
	if (fullfill) {
		;(([x, y, z, w]) => {
			w.style.visibility = z
			// @ts-ignore
			formpage.style.marginLeft = `-${x}00%`
			// @ts-ignore
			fsub.setAttribute("value", y)
		// @ts-ignore
		})(p==0 ? [1, sen, "visible", fback] : [2, nxt, "hidden", fsub])

		// @ts-ignore
		if ( p != 0 && getYear() - getYear(document.querySelector("input[type=date]").value) > 13)
			// @ts-ignore
			document.querySelector("input[type=submit]").click()
		submitpoint++
	}
}

// @ts-ignore
fback.onclick = ()=>goback(submitpoint)
// @ts-ignore
fsub.onclick = ()=>check(submitpoint)

const telem = document.querySelector("input[type=tel]"),
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
		utilsScript: "utils.js",
	})
// @ts-ignore
telem.onchange = () => document.querySelector('input#real_no').setAttribute('value',phoneInput.getNumber())

})
