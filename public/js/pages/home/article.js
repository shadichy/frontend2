// import("../main")
// function fpost(smode, f) {
// 	f()
// }
let stask = !0,
  orgwidth = 720,
  xscale =
    document.querySelector("#bruh>div:nth-child(4)").getBoundingClientRect()
      .width / 720,
  limit = 3,
  foundsame = false
const { dburl, alt_placeholder } = require("../../env")
document.page = 0
document.end = false
document.ltask = false
function share(url) {
  window.open(
    `https://${url}`,
    "_blank",
    "location=yes,height=570,width=520,scrollbars=yes,status=yes"
  )
  // if (stask) {
  // 	stask = false
  // 	fpost("share", () => { stask = true })
  // }
}

// get http://localhost:80/wp-json/wp/v2/posts?lang=${lang}&_fields=title,content
// then append content into #bruh>child2
const fields =
    "title.rendered,slug,_links.wp:featuredmedia,_embedded,content.rendered",
  wpDate = (str) => {
    return new Date(str).toLocaleString(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
  },
  render = (data) => {
    let bruh = document.querySelector("#bruh>div:nth-child(2)")
    // dtm is local time format of wpDate(data.date)
    // let dtm =
    bruh.innerHTML += `
		<h1>${data.title}</h1>
		<div style="display: flex;font-size: 1.6vh;width: 100%;height: 3vh;justify-content: space-between;padding:0 1vh;box-sizing:border-box">
			<i>${transBy}<span id="auname">${data.author}</span></i>
			<p style='margin:0'>${wpDate(data.date)}</p>
		</div>
		<div id="wpcontent">${data.content}</div>`
    // // console.log(bruh.innerHTML)
  }
// fetch(`${config.wpOrigin}/wp-json/wp/v2/posts?lang=${window.lang}&_fields=title,content,author,date&slug=${window.params.short}`).then((response) => response.json()).then((data) => {
// 	// // console.log(data)
// 	if (data.length > 0) render(data[0])
// })
function load(limit) {
  if (document.end || document.ltask) return
  document.ltask = true
  let ct = document.getElementsByClassName("rel")
  for (let i = document.page; i < document.page + limit; i++) {
    // console.log("create loader" + (i))
    if (i < 3)
      ct[0].innerHTML += `
		<a href="#" class="loading relitem${i}">
			<img loading="lazy" src="${alt_placeholder}" alt=""/>
			<span></span>
			<h2></h2>
		</a>`
    ct[1].innerHTML += `
			<a href="#" class="newsbg loading relitem${i}">
				<img src="${alt_placeholder}" alt=""/>
				<span></span>
				<h2></h2>
			</a>`
  }
  fetch(
    dburl +
      `?lang=${lang}&_fields=${fields}&tags=${window.prefet.tags}&limit=${
        !foundsame ? limit++ : limit
      }&offset=${document.page}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      const page = document.page
      for (let i = 0; i < (data.length <= 3 ? data.length : 3); i++) {
        if (data[i].short == window.params.short) data.splice(i, 1)
        if (!data[i]) continue
        let id = page + i
        // console.log("finish " + (id) + " with data", data[i])
        Array.from(document.getElementsByClassName(`relitem${id}`)).forEach(
          (x) => {
            x.classList.remove("loading")
            x.querySelector("img").setAttribute(
              "src",
              data[i].thumb
                ? data[i].thumb["wp:featuredmedia"][0].media_details.sizes[
                    "medium"
                  ].source_url
                : alt_placeholder
            )
            x.querySelector("h2").innerHTML = data[i].title
            x.setAttribute("href", `/${lang}/article/${data[i].short}`)
          }
        )
      }
      document.page += limit
      document.ltask = false
      if (limit > data.length) {
        document.end = true
        let elements = document.getElementsByClassName("loading")
        while (elements.length > 0) {
          elements[0].parentNode.removeChild(elements[0])
        }
        // console.log("end", limit, limit)
        return
      }
    })
}
load(limit)
// fetch(`/api/arli?lang=${lang}&_fields=${fields}&tags=${window.prefet.tags}`).then(r=>r.json()).then(d=>{
// 	s
// })
render(window.prefet.content)
if (innerWidth > orgwidth) {
  root.style.setProperty("--ratio", xscale)
  window.customfunc.push(() => {
    xscale =
      document.querySelector("#bruh>div:nth-child(4)").getBoundingClientRect()
        .width / 720
    root.style.setProperty("--ratio", xscale)
  })
}
window.onscroll = () => {
  // if scroll near the last element, load limit
  if (
    document.getElementsByClassName("loading").length == 0 &&
    document.getElementsByClassName("newsbg").length >= 0
  ) {
    if (
      document
        .getElementsByClassName("newsbg")
        [
          document.getElementsByClassName("newsbg").length - 1
        ].getBoundingClientRect().top < window.innerHeight
    ) {
      load(limit)
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const shareLinks = [
    `facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&amp;src=sdkpreparse`,
    `twitter.com/intent/tweet?text=${encodeURIComponent(
      document.title
    )}%0A&url=${encodeURIComponent(
      window.location.href
    )}``reddit.com/submit/?url=${encodeURIComponent(
      window.location.href
    )}&title=${encodeURIComponent(document.title)}%0A&amp;resubmit=true&amp`,
  ]

  document
    .querySelectorAll("#bruh>div>div>span")
    .forEach((sharebtn, i) => (sharebtn.onclick = () => share(shareLinks[i])))
})

window.customfunc.forEach((f) => f())
