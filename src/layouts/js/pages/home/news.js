
const today = ~~(+new Date/86400000),
  sortFn = (r) => 
    // (getDate(r) + r.size) // adition method
    ((r.size + 1) / (today - r.reldate)) // division method


function searchNews(a) {
  const searchResults  = document.getElementById("srr") 
  if (!a) {
    // @ts-ignore
    searchResults.innerHTML = ""
    return
  }
  // @ts-ignore
  const processedList = window.postList
    .map(post => ({
      ...post,
      size: a.toLowerCase()
        .split(" ")
        .filter(t => t && post.title.toLowerCase().includes(t))
        .length
    }))
    .filter(({size}) => size > 0)
    .sort((a, b) => sortFn(b) - sortFn(a))
  // @ts-ignore
  searchResults.innerHTML = processedList
    .map(post => `<a href=${post.url}>${post.title}</a>`)
    .join("")

}

// let newslimit = 3,
//   lck = true,
//   waitlist = 1

// var page = 0,
  // end = false,
  // ltask = false
// function searchNews(a) {
//   // console.log(a.value)
//   const searchResults = (()=>document.getElementById("searchResults"))()
//   if (!a.value) {
//     // @ts-ignore
//     searchResults.innerHTML = ""
//     return
//   }
//   if (lck) {
//     lck = false
//     // @ts-ignore
//     fetch(dburl + `?lang=${lang}&limit=5&search=${encodeURIComponent(a.value)}`)
//       .then((r) => r.json())
//       .then((data) => {
//         // console.log("have result")
//         // @ts-ignore
//         searchResults.innerHTML = ""
//         // for (let i = 0; i < data.length; i++) {
//         //   // @ts-ignore
//         //   searchResults.innerHTML += `<a href="${exlang}/article/${data[i].short}">${data[i].title}</a>`
//         // }
//         // waitlist--
//         setTimeout(() => {
//           lck = true
//           if (waitlist > 0) searchNews(a)
//         }, 500)
//       })
//   } else waitlist = 2
// }
// function load(limit) {
//   if (end || ltask) return
//   ltask = true
//   for (let i = page; i < page + limit; i++) {
//     // console.log("create loader" + (i))
//     // @ts-ignore
//     document.getElementById("newscontent").innerHTML += `
// 			<a href="#" class="newsbg loading" id="newsitem${i}">
// 			<img src="${
// // @ts-ignore
// 			img_placeholder}" alt=""/>
// 				<div>
// 					<h1 class="txtd"></h1>
// 					<p class="kad txtd"></p>
// 				</div>
// 			</a>`
//   }
//   // console.log(dburl + `?lang=${lang}&limit=${limit}&offset=${page}`)
//   // @ts-ignore
//   fetch(dburl + `?lang=${lang}&limit=${limit}&offset=${page}`)
//     .then((response) => response.json())
//     .then((data) => {
//       const subpage = page
//       for (let i = 0; i < (data.length <= 3 ? data.length : 3); i++) {
//         let id = subpage + i
//         // console.log("finish " + (id) + " with data", data[i])
//         // @ts-ignore
//         document.getElementById(`newsitem${id}`).classList.remove("loading")
//         // @ts-ignore
//         document.getElementById(`newsitem${id}`).innerHTML = `
// 			<img loading="lazy" src="${
//         data[i].thumb
//           ? data[i].thumb["wp:featuredmedia"][0].media_details.sizes["full"]
//               .source_url
//           // @ts-ignore
//           : alt_placeholder
//       }" alt="Team Fuho Vietnam"/>
// 			<div>
// 			<h1 class="txtd">${data[i].title}</h1>
// 			<p class="kad txtd">${data[i].prev}</p>
// 			</div>`
//         // @ts-ignore
//         document
//           .getElementById(`newsitem${id}`)
//           // @ts-ignore
//           .setAttribute("href", `/${exlang}/article/${data[i].short}`)
//       }
//       page += limit
//       ltask = false
//       if (3 > data.length) {
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

// // @ts-ignore
// @ts-ignore
window.addEventListener("DOMContentLoaded", (e)=>{
  const searchbox = document.getElementById("searchbar")
  // @ts-ignore
  searchbox.oninput = ()=>searchNews(searchbox.value)

// load(newslimit)
// })
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
//       load(newslimit)
//     }
//   }
})
