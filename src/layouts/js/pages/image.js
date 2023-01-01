window.addEventListener("DOMContentLoaded", ()=>{
  const returnBtn = document.getElementById("gotogal"),
    shareBtn = document.getElementById("share")
  // @ts-ignore
  shareBtn.onclick = ()=>{
    navigator.clipboard.writeText(location.href)
    // @ts-ignore
    shareBtn.innerText = copied
  }
})
