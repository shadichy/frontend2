// import("./main")
const dragula = require("dragula"),
  { formatter } = require("./main")

// console.log("load cart")

let json_product_template = {
    "98esdf": {
      name: "product1",
      price: {
        original: 100,
        discount: 50,
      },
      maxcount: 192,
      maxsale: 10,
      ordercount: 1,
      image: "/res/img/the2.png",
    },
    "89fhEa": {
      name: "product2",
      price: {
        original: 200,
        discount: 50,
      },
      maxcount: 192,
      maxsale: 1,
      ordercount: 1,
      image: "/res/img/the3.png",
    },
  },
  html_product_template = ({
    id,
    img,
    name,
    currentcount,
    maxcount,
    orgprice,
  }) => `
  <tr id="${id}">
    <td>
      <input type="checkbox" name="checkbox_${id}" id="checkbox_${id}">
    </td>
    <td>
      <img src="${img}" alt="product" />
      <div>
        <h3>${name}</h3>
      </div>
    </td>
    <td>
      <div>
        <span>-</span>
        <input type="number" name="quant_${id}" id="quant_${id}" placeholder="1" max="${maxcount}" min="1" value="${currentcount}">
        <span>+</span>
      </div>
    </td>
    <td>${formatter.format(orgprice)}</td>
    <td>${formatter.format(orgprice * currentcount)}</td>
    <td>
      <a href="#">Remove</a>
    </td>
  </tr>`,
  coupons_template = {
    "3c8ta3": {
      name: "Lorem ipsum dolor sit amet",
      type: "shipment",
      discount: {
        fixed: 0,
        percent: 100,
      },
    },
    "8sah4du": {
      name: "Lorem ipsum dolor sit amet",
      type: "price",
      discount: {
        fixed: 0,
        percent: 10,
      },
    },
    "0djs4k": {
      name: "Lorem ipsum dolor sit amet",
      type: "price",
      discount: {
        fixed: 0,
        percent: 20,
      },
    },
    "9nym9s": {
      name: "Lorem ipsum dolor sit amet",
      type: "shipment",
      discount: {
        fixed: 0,
        percent: 100,
      },
    },
    jas924h: {
      name: "Lorem ipsum dolor sit amet",
      type: "price",
      discount: {
        fixed: 0,
        percent: 10,
      },
    },
    "9sjd9a": {
      name: "Lorem ipsum dolor sit amet",
      type: "price",
      discount: {
        fixed: 0,
        percent: 20,
      },
    },
  },
  user_coupon = {
    applied_coupon_list: ["3c8ta3", "8sah4du", "0djs4k"],
    available_coupon_list: ["9nym9s", "jas924h", "9sjd9a"],
  },
  selected_product = {},
  sum = 0,
  org = 0

const func_a = (s, t, id, cb) => {
    user_coupon[`${s}_list`].splice(user_coupon[`${s}_list`].indexOf(id), 1)
    user_coupon[`${t}_list`].push(id)
    selCheck({ check: null })
    cb(s, t)
  },
  htmlCoupon = (e, d, t) => `
        <li id="${d}">
            <span>${
              e[d].type == "shipment"
                ? "freeship"
                : e[d].discount.fixed <= 0
                ? e[d].discount.percent + "%"
                : "$" + e[d].discount.fixed
            }</span>
            <p>${e[d].name}</p>
            <button onclick="changeList(this)">${t}</button>
        </li>`

function changeList(e) {
  const id = e.parentElement.getAttribute("id")

  if (e.innerText == "Apply")
    func_a("available_coupon", "applied_coupon", id, () => {
      e.innerText = "Remove"
      e.parentElement.remove()
      document.querySelector("#applied_coupon>ul").innerHTML +=
        e.parentElement.outerHTML
    })
  else
    func_a("applied_coupon", "available_coupon", id, () => {
      e.innerText = "Apply"
      e.parentElement.remove()
      document.querySelector("#available_coupon>ul").innerHTML +=
        e.parentElement.outerHTML
    })
}

function selCheck(e) {
  if (e.checked != null) {
    let el = e.parentElement.parentElement,
      // od = json_product_template[el.getAttribute("id")],
      co = el.querySelector("input[type=number]").value
    if (e.checked) {
      selected_product[e.parentElement.parentElement.getAttribute("id")] = co
      // selected_product.push({id: e.parentElement.parentElement.getAttribute("id")})
    } else {
      delete selected_product[e.parentElement.parentElement.getAttribute("id")]
      // selected_product.splice(selected_product.indexOf(e.parentElement.parentElement.getAttribute("id")), 1)
    }
  }

  // if (e.checked!=null) {
  // ad = (co > 0) ? od.price.original * ( parseInt(co) - od.price.discount  / 100) : 0
  //     // console.log(od.price.original, co, od.price.discount, ad)

  //     // e.checked?org+=ad:org-=ad
  //     org = 0
  // }
  org = 0
  Object.keys(selected_product).forEach((d, i) => {
    count = parseInt(selected_product[d])
    org +=
      json_product_template[d].price.original *
      (count -
        (json_product_template[d].price.discount *
          (count < json_product_template[d].maxsale
            ? count
            : json_product_template[d].maxsale)) /
          100)
  })
  sum = 0
  user_coupon.applied_coupon_list.forEach((d, i) => {
    if (org == 0) return sum
    console.log(d)
    console.log(user_coupon.applied_coupon_list[d])
    let s = coupons_template[d]
    console.log(s)
    if (s.type != "shipment")
      sum += (org * s.discount.percent) / 100 + s.discount.fixed
  })
  console.log(sum)
  document.getElementById("pcou").innerText =
    Object.keys(selected_product).length
  document.getElementById("ppric").innerText = formatter.format(org - sum)
  document.getElementById("ppcoup").innerText = formatter.format(sum)
}

// window.addEventListener("DOMContentLoaded", () => {
const table = document.querySelector("#cart table tbody")

Object.entries(json_product_template).forEach((entry) => {
  const [key, value] = entry

  table.innerHTML += html_product_template({
    id: key,
    img: value.image,
    name: value.name,
    currentcount: value.ordercount,
    maxcount: value.maxcount,
    orgprice: value.price.original,
    // discounted: value.price.discount,
    // maxsale: value.maxsale
  })

  const ckbox = table.querySelector(`input#checkbox_${key}`)
  ckbox.onchange = () => selCheck(ckbox)
})

const rpcount = document.querySelectorAll(
    "#cart table tbody tr td:nth-child(3)"
  ),
  ptotal = document.querySelectorAll("#cart table tbody tr td:nth-child(5)"),
  used_coupon = document.querySelector("#applied_coupon>ul"),
  available_coupon = document.querySelector("#available_coupon>ul")
for (let i = 0; i < rpcount.length; i++) {
  let pcount = rpcount[i].querySelector("input"),
    pcount_btn = rpcount[i].querySelectorAll("span"),
    el = pcount.parentElement.parentElement.parentElement,
    id = el.getAttribute("id")
  ckbox = el.querySelector("input[type=checkbox]")
  console.log(el)
  pcount.addEventListener("change", () => {
    if (pcount.value > json_product_template[id].maxcount)
      pcount.value = json_product_template[id].maxcount

    if (pcount.value < 1) pcount.value = 1

    selCheck(el.querySelector("input[type=checkbox]"))
  })
  pcount_btn[0].addEventListener("mouseup", () => {
    if (pcount.value > 1) {
      pcount.value--
      ptotal[i].innerHTML = formatter.format(
        json_product_template[id].price.original * pcount.value
      )
    }
    selCheck(el.querySelector("input[type=checkbox]"))
    console.log(i, ckbox)
  })
  pcount_btn[1].addEventListener("mouseup", () => {
    if (pcount.value < json_product_template[id].maxcount) {
      pcount.value++
      ptotal[i].innerHTML = formatter.format(
        json_product_template[id].price.original * pcount.value
      )
    }
    selCheck(el.querySelector("input[type=checkbox]"))
    console.log(
      i,
      el.querySelector("input[type=checkbox]").parentElement.parentElement
    )
  })
}

dragula([
  document.querySelector("section#available_coupon>ul"),
  document.querySelector("section#applied_coupon>ul"),
]).on("drop", (el, target, source, sibling) => {
  console.log(source, target)
  // remove child el from source
  func_a(
    source.parentElement.getAttribute("id"),
    target.parentElement.getAttribute("id"),
    el.getAttribute("id"),
    () => {
      el.querySelector("button").innerText =
        target.parentElement.getAttribute("id") == "applied_coupon"
          ? "Remove"
          : "Apply"
    }
  )
  // used_coupon[`${source.getAttribute("id")}_list`].forEach((d,i)=> {
  //     if (d == el.getAttribute("id")) {
  //         used_coupon[`${source.getAttribute("id")}_list`].splice(i, 1)
  //         used_coupon[`${target.getAttribute("id")}_list`].push(el.getAttribute("id"))
  //         return
  //     }
  // })
})

user_coupon.applied_coupon_list.forEach((d, i) => {
  // console.log(d)
  used_coupon.innerHTML += htmlCoupon(coupons_template, d, "Remove")
  // used_coupon.innerHTML += `
  // <li id="${d}">
  //     <span>${coupons_template[d].type=="shipment"?"freeship":coupons_template[d].discount.fixed<=0?coupons_template[d].discount.percent+"%":"$"+coupons_template[d].discount.fixed}</span>
  //     <p>${coupons_template[d].name}</p>
  //     <button onclick="changeList(this)">Remove</button>
  // </li>`
})
user_coupon.available_coupon_list.forEach((d, i) => {
  // console.log(d)
  available_coupon.innerHTML += htmlCoupon(coupons_template, d, "Apply")
  // available_coupon.innerHTML += `
  // <li id="${d}">
  //     <span>${coupons_template[d].type=="shipment"?"freeship":coupons_template[d].discount.fixed<=0?coupons_template[d].discount.percent+"%":"$"+coupons_template[d].discount.fixed}</span>
  //     <p>${coupons_template[d].name}</p>
  //     <button onclick="changeList(this)">Apply</button>
  // </li>`
})

document.getElementById("pcou").innerText = "0"
document.getElementById("ppric").innerText = formatter.format(0)
document.getElementById("ppcoup").innerText = formatter.format(0)

// })
