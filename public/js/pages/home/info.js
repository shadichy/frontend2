
window.addEventListener("DOMContentLoaded", () => {

// @ts-ignore
const setProp = (prop, val) => root.style.setProperty(prop, val)

setTimeout(() => {
  setProp("--cta", "'2000'")
  setProp("--ctb", "'4'")
  setProp("--ctc", "'200'")
}, 2000)
})
