// import("./main")
// import("./product-list")

// const { shopitem } = require("./global")

document.getElementById("keyword").innerHTML = new URLSearchParams(
  window.location.search
).get("search")
