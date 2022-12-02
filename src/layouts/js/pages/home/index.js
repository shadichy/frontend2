import Hls from "hls.js"

// @ts-ignore
let reqheight = 0,
	reqmin = 0,
	reqmax = 0

function fscr() {
	let b = window.scrollY
	// @ts-ignore
	document.getElementsByClassName("nav")[0].style.top =
		b == reqheight || (b >= reqmin && b <= reqmax) ? "-10vh" : "0"
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

