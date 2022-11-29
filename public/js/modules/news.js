// window.addEventListener("DOMContentLoaded",(e)=>{
  // let x = document.getElementsByClassName("news")[0]
  // for (let i = 0; i < 3; i++) {
  //   x.innerHTML += `
  // <a href="#" id="topnews${i}">
  //   <img loading="lazy" alt="Team Fuho Vietnam" src="${
  //     // @ts-ignore
  //     alt_placeholder}"/>
  //   <span></span>
  //   <div>
  //     <h2></h2>
  //   </div>
  // </a>`.trim()
  // }
  // /* @ts-ignore */
  // fetch(`${dburl}?lang=${lang}&limit=3`)
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     for (let i = 0; i < 3; i++) {
  //       let y = document.getElementById(`topnews${i}`)
  //       /* @ts-ignore */
  //       y.setAttribute("href", `${exlang}/article/${data[i].short}`)
  //       /* @ts-ignore */
  //       y.innerHTML = `
  //   <img loading="lazy" alt="Team Fuho Vietnam" src="${
  //     data[i].thumb
  //       ? data[i].thumb["wp:featuredmedia"][0].media_details.sizes["full"]
  //           .source_url
  //       /* @ts-ignore */
  //       : alt_placeholder
  //   }"/>
  //   <span></span>
  //   <div>
  //     <h2>${data[i].title}</h2>
  //   </div>
  //     `
  //     }
  //   })
// })
