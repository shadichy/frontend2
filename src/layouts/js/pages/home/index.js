import Hls from "hls.js"

// @ts-ignore
let requiredHeight = 0,
	minRequiredHeight = 0,
	maxRequiredHeight = 0

function fscr() {
	let b = window.scrollY
	// @ts-ignore
	document.getElementsByClassName("nav")[0].style.top =
		b == requiredHeight || (b >= minRequiredHeight && b <= maxRequiredHeight) ? "-10vh" : "0"
	// @ts-ignore
	eScroll(fscr)
}

// @ts-ignore
window.addEventListener("DOMContentLoaded", (e)=>{
	const vidElem = document.getElementById("b01")
// @ts-ignore
if (!vidElem.muted)
	// @ts-ignore
	vidElem.muted = true
function initHLP(s, t) {
	if (Hls.isSupported()) {
		let hls = new Hls()
		hls.loadSource(s)
		hls.attachMedia(t)
	}
}
initHLP("/content/video/webvid/webvid.m3u8", vidElem)
// @ts-ignore
fscr()
})

