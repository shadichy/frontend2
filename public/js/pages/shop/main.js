// import("../../main")
// import(`../../../css/pages/${layout}/${path}.css`)
// import(`./${path}`)

const toLocale = {
    vi: "VN",
    en: "US",
    zh: "CN",
    ko: "KR",
    fr: "FR",
    jp: "JP",
    ru: "RU",
  },
  toCurrency = {
    vi: "VND",
    en: "USD",
    ru: "RUB",
    ko: "KRW",
    fr: "EUR",
    jp: "JPY",
    zh: "CNY",
  },
  // @ts-ignore
  langWithLocale = lang == "nom" ? "vi-VN" : `${lang}-${toLocale[lang]}`,
  formatter = new Intl.NumberFormat(`${langWithLocale}`, {
    style: "currency",
    // @ts-ignore
    currency: `${toCurrency[lang]}`,
  }),
  shopitem = ({ id, title, img, buycount, price, sale }) => `
<a class="item" href="${
// @ts-ignore
exlang}/shop/product?id=${id}">
    <img loading="lazy" src="${img}" alt="${id}">
    <p>${title}</p>
    <section>
        <p>(${buycount})</p>
    </section>
    <section>
        <p>${formatter.format(price)}</p>
        ${sale == 0 ? "" : `<p>-${sale}%</p>`}
    </section>
</a>`

window["customfunc"].push(() => {
  if (
    !(
      location.pathname.endsWith("/shop") ||
      location.pathname.endsWith("/shop/")
    )
  )
    // @ts-ignore
    document.querySelector("#head>span:first-child").innerHTML = `
        <a href="/shop">
            <svg viewBox="0 0 26.676 26.676">
                <path d="m 24.8283,21.035822 c -0.2061,0 -0.3951,-0.1179 -0.4761,-0.3114 v 0 c -0.0594,-0.1404 -1.5444,-3.4713 -7.0965,-4.131 -1.1565,-0.1404 -2.5416,-0.2124 -4.2237,-0.225 v 4.1517 c 0,0.1917 -0.1035,0.3654 -0.2736,0.4572 -0.1692,0.0882 -0.3717,0.0756 -0.5292,-0.0297 l -10.6668,-7.1802 c -0.144,-0.0963 -0.2286,-0.2583 -0.2286,-0.4284 0,-0.1719 0.0846,-0.3285 0.2286,-0.4293 L 12.2337,5.7286222 c 0.1575,-0.1089 0.3582,-0.1161 0.5292,-0.0261 0.171,0.0918 0.2727,0.2655 0.2727,0.4518 v 3.8636998 c 2.3202,0.3024 12.3066,2.097 12.3066,10.5066 0,0.2439 -0.1719,0.4572 -0.4131,0.5058 -0.0333,0.0054 -0.0684,0.0054 -0.1008,0.0054 z" style="fill:none;stroke:#002049;stroke-width:1.5;stroke-opacity:1;stroke-dasharray:none" />
            </svg>
            <p>Trở về</p>
        </a>`
  // subcall()
})

window["customfunc"].forEach((f) => f())

export default {
  formatter,
  shopitem,
}
