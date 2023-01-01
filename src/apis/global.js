import Defaults from "../defaults";

const { wpurl } = Defaults

async function fetchAPI(query) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(wpurl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export default {
  fetchAPI
}
