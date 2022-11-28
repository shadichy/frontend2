window.addEventListener("DOMContentLoaded", (e)=>{
  // @ts-ignore
  reqheight = 0
// main.fscr()
// @ts-ignore
if (!document.getElementById("b01").muted)
  // @ts-ignore
  document.getElementById("b01").muted = true
function initHLP(s, t) {
  // @ts-ignore
  if (Hls.isSupported()) {
    // @ts-ignore
    let hls = new Hls()
    hls.loadSource(s)
    hls.attachMedia(document.getElementById(t))
  }
}
initHLP("/content/video/webvid/webvid.m3u8", "b01")
// @ts-ignore
fscr()
})
