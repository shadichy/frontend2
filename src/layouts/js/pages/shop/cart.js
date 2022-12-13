import dragula from "dragula"
import Main from "./main"

const { formatter } = Main
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
  org = 0;

const func_a = (s, t, id, cb) => {
    user_coupon[`${s}_list`].splice(user_coupon[`${s}_list`].indexOf(id), 1);
    user_coupon[`${t}_list`].push(id);
    selectionChecking({ check: null });
    cb(s, t);
  },
  htmlCoupon = (template, couponID, btnstate) => {
    const Elem = document.createElement("li")
    Elem.setAttribute("id", couponID)
    Elem.innerHTML = `
      <span>${
        template[couponID].type == "shipment"
          ? "freeship"
          : template[couponID].discount.fixed <= 0
          ? template[couponID].discount.percent + "%"
          : "$" + template[couponID].discount.fixed
      }</span>
      <p>${template[couponID].name}</p>
      <button data-state="${btnstate}">${
      btnstate == 0 ? "Apply" : "Remove"
    }</button>`;
    const btn = Elem.querySelector("button")
    // @ts-ignore
    btn.onclick = () => changeList(btn, couponID)
    return Elem
  }

// @ts-ignore
function changeList(btnElem, couponID) {
  const cpns = ["available_coupon", "applied_coupon"]
    // @ts-ignore
  let state = btnElem.getAttribute("data-state");

  (([a, b, text]) => {
    func_a(cpns[a], cpns[b], couponID, () => {
      btnElem.innerText = text;
      btnElem.parentElement.remove();
      // @ts-ignore
      document.querySelector(`#${cpns[b]}>ul`).innerHTML +=
        btnElem.parentElement.outerHTML;
    });
  })(state == "0" ? [0, 1, "Remove"] : [1, 0, "Apply"]);

  btnElem.setAttribute("data-state", state == "0" ? "1" : "0");
}

function selectionChecking(elem) {
  if (elem.checked != null) {
    let el = elem.parentElement.parentElement,
      // od = json_product_template[el.getAttribute("id")],
      co = el.querySelector("input[type=number]").value;
    if (elem.checked) {
      selected_product[elem.parentElement.parentElement.getAttribute("id")] = co;
      // selected_product.push({id: elem.parentElement.parentElement.getAttribute("id")})
    } else {
      delete selected_product[elem.parentElement.parentElement.getAttribute("id")];
      // selected_product.splice(selected_product.indexOf(elem.parentElement.parentElement.getAttribute("id")), 1)
    }
  }

  // if (elem.checked!=null) {
  // ad = (co > 0) ? od.price.original * ( parseInt(co) - od.price.discount  / 100) : 0
  //     // console.log(od.price.original, co, od.price.discount, ad)

  //     // elem.checked?org+=ad:org-=ad
  //     org = 0
  // }
  org = 0;
  // @ts-ignore
  // @ts-ignore
  Object.keys(selected_product).forEach((d, i) => ((count)=>org +=
      json_product_template[d].price.original *
      (count -
        (json_product_template[d].price.discount *
          (count < json_product_template[d].maxsale
            ? count
            : json_product_template[d].maxsale)) /
          100))(parseInt(selected_product[d]))
  );
  sum = 0;
  // @ts-ignore
  // @ts-ignore
  user_coupon.applied_coupon_list.forEach((d, i) => {
    if (org == 0) return sum;
    console.log(d);
    console.log(user_coupon.applied_coupon_list[d]);
    let s = coupons_template[d];
    console.log(s);
    if (s.type != "shipment")
      sum += (org * s.discount.percent) / 100 + s.discount.fixed;
  });
  console.log(sum);
  // @ts-ignore
  document.getElementById("pcou").innerText =
    Object.keys(selected_product).length.toString();
  // @ts-ignore
  document.getElementById("ppric").innerText = formatter.format(org - sum);
  // @ts-ignore
  document.getElementById("ppcoup").innerText = formatter.format(sum);
}

window.addEventListener("DOMContentLoaded", () => {
const table = document.querySelector("#cart table tbody");

Object.entries(json_product_template).forEach(([key, value]) => {

  // @ts-ignore
  table.innerHTML += html_product_template({
    id: key,
    img: value.image,
    name: value.name,
    currentcount: value.ordercount,
    maxcount: value.maxcount,
    orgprice: value.price.original,
    // discounted: value.price.discount,
    // maxsale: value.maxsale
  });

  // @ts-ignore
  const ckbox = table.querySelector(`input#checkbox_${key}`);
  // @ts-ignore
  ckbox.onchange = () => selectionChecking(ckbox);
});

const
  ptotal = document.querySelectorAll("#cart table tbody tr td:nth-child(5)"),
  used_coupon = document.querySelector("#applied_coupon>ul"),
  available_coupon = document.querySelector("#available_coupon>ul");

document
  .querySelectorAll("#cart table tbody tr td:nth-child(3)")
  .forEach((elem, index) => {
    const productCount = elem.querySelector("input"),
      addMinusBtn = elem.querySelectorAll("span"),
      // @ts-ignore
      el = productCount.parentElement.parentElement.parentElement,
      // @ts-ignore
      id = el.getAttribute("id"),
      // @ts-ignore
      // @ts-ignore
      ckbox = el.querySelector("input[type=checkbox]");
    // @ts-ignore
    let productCountValue = parseInt(productCount.value);
    // @ts-ignore
    productCount.addEventListener("change", () => {
      productCountValue > json_product_template[id].maxcount &&
        // @ts-ignore
        (productCount.value = json_product_template[id].maxcount.toString());

      // @ts-ignore
      productCountValue < 1 && (productCount.value = "1");

      // @ts-ignore
      selectionChecking(el.querySelector("input[type=checkbox]"));
    });
    addMinusBtn[0].addEventListener("mouseup", () => {
      if (productCountValue > 1) {
        productCountValue--;
        // @ts-ignore
        productCount.value = productCountValue.toString();
        ptotal[index].innerHTML = formatter.format(
          json_product_template[id].price.original * productCountValue
        );
      }
      // @ts-ignore
      selectionChecking(el.querySelector("input[type=checkbox]"));
    });
    addMinusBtn[1].addEventListener("mouseup", () => {
      if (productCountValue < json_product_template[id].maxcount) {
        productCountValue++;
        // @ts-ignore
        productCount.value = productCountValue.toString();
        ptotal[index].innerHTML = formatter.format(
          json_product_template[id].price.original * productCountValue
        );
      }
      // @ts-ignore
      selectionChecking(el.querySelector("input[type=checkbox]"));
    });
  });

// @ts-ignore
dragula([
  document.querySelector("section#available_coupon>ul"),
  document.querySelector("section#applied_coupon>ul"),
// @ts-ignore
// @ts-ignore
]).on("drop", (el, target, source, sibling) => {
  console.log(source, target);
  // remove child el from source
  const idatt = (elem)=>elem.parentElement.getAttribute("id")
  func_a(
    // @ts-ignore
    idatt(source),
    // @ts-ignore
    idatt(target),
    el.getAttribute("id"),
    () => 
      // @ts-ignore
      el.querySelector("button").innerText =
        // @ts-ignore
        idatt(target) == "applied_coupon"
          ? "Remove"
          : "Apply"
  );
});

// @ts-ignore
// @ts-ignore
user_coupon.applied_coupon_list.forEach((d, i) => 
  // @ts-ignore
  used_coupon.appendChild(htmlCoupon(coupons_template, d, 1)));
// @ts-ignore
// @ts-ignore
user_coupon.available_coupon_list.forEach((d, i) => 
  // @ts-ignore
  available_coupon.appendChild(htmlCoupon(coupons_template, d, 0)));

// @ts-ignore
document.getElementById("pcou").innerText = "0";
// @ts-ignore
document.getElementById("ppric").innerText = formatter.format(0);
// @ts-ignore
document.getElementById("ppcoup").innerText = formatter.format(0);

})
