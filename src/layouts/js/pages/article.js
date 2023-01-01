
let stask = !0,
  orgwidth = 720,
  limit = 3,
  foundsame = false
var page = 0,
  end = false,
  ltask = false

function sharePost(url) {
  window.open(
    `https://${url}`,
    "_blank",
    "location=yes,height=570,width=520,scrollbars=yes,status=yes"
  )
}

// get http://localhost:80/wp-json/wp/v2/posts?lang=${lang}&_fields=title,content
// then append content into #bruh>child2
// const fields =
//     "title.rendered,slug,_links.wp:featuredmedia,_embedded,content.rendered"
// function load(limit) {
//   if (end || ltask) return
//   ltask = true
//   let ct = document.getElementsByClassName("rel")
//   for (let i = page; i < page + limit; i++) {
//     // console.log("create loader" + (i))
//     if (i < 3)
//       ct[0].innerHTML += `
// 		<a href="#" class="loading relitem${i}">
// 			<img loading="lazy" src="${
// // @ts-ignore
// 			alt_placeholder}" alt=""/>
// 			<span></span>
// 			<h2></h2>
// 		</a>`
//     ct[1].innerHTML += `
// 			<a href="#" class="newsbg loading relitem${i}">
// 				<img src="${
// // @ts-ignore
// 				alt_placeholder}" alt=""/>
// 				<span></span>
// 				<h2></h2>
// 			</a>`
//   }
//   fetch(
//     // @ts-ignore
//     dburl +
//       // @ts-ignore
//       `?lang=${lang}&_fields=${fields}&tags=${window.articleTags}&limit=${
//         !foundsame ? limit++ : limit
//       }&offset=${page}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // console.log(data)
//       const subpage = page
//       for (let i = 0; i < (data.length <= 3 ? data.length : 3); i++) {
//         if (data[i].url == location.pathname) data.splice(i, 1)
//         if (!data[i]) continue
//         let id = subpage + i
//         // console.log("finish " + (id) + " with data", data[i])
//         Array.from(document.getElementsByClassName(`relitem${id}`)).forEach(
//           (x) => {
//             x.classList.remove("loading")
//             // @ts-ignore
//             x.querySelector("img").setAttribute(
//               "src",
//               data[i].thumb
//                 ? data[i].thumb["wp:featuredmedia"][0].media_details.sizes[
//                     "medium"
//                   ].source_url
//                 // @ts-ignore
//                 : alt_placeholder
//             )
//             // @ts-ignore
//             x.querySelector("h2").innerHTML = data[i].title
//             // @ts-ignore
//             x.setAttribute("href", `/${lang}/article/${data[i].short}`)
//           }
//         )
//       }
//       page += limit
//       ltask = false
//       if (limit > data.length) {
//         end = true
//         let elements = document.getElementsByClassName("loading")
//         while (elements.length > 0) {
//           // @ts-ignore
//           elements[0].parentNode.removeChild(elements[0])
//         }
//         // console.log("end", limit, limit)
//         return
//       }
//     })
// }
// window.onscroll = () => {
//   // if scroll near the last element, load limit
//   if (
//     document.getElementsByClassName("loading").length == 0 &&
//     document.getElementsByClassName("newsbg").length >= 0
//   ) {
//     if (
//       document
//         .getElementsByClassName("newsbg")
//         [
//           document.getElementsByClassName("newsbg").length - 1
//         ].getBoundingClientRect().top < window.innerHeight
//     ) {
//       load(limit)
//     }
//   }
// }

window.addEventListener("DOMContentLoaded", () => {
  const eUC = encodeURIComponent,
    url = eUC(location.href),
    tit = eUC(document.title),
    shareLinks = [
      `facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`,
      `twitter.com/intent/tweet?text=${tit}%0A&url=${url}`,
      `reddit.com/submit/?url=${url}&title=${tit}%0A&amp;resubmit=true&amp`,
    ],
    // @ts-ignore
    xscale = ()=>root.style.setProperty("--ratio", document.querySelector("#bruh>div:nth-child(4)").getBoundingClientRect().width / 720)

  document.querySelectorAll("#bruh>div>div>span").forEach(
    // @ts-ignore
    (sharebtn, i) => (sharebtn.onclick = () => sharePost(shareLinks[i]))
  );

  // load(limit)
  if (innerWidth > orgwidth) {
    // @ts-ignore
    window["customfunc"].push(xscale)
  }
})
