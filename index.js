/**
 * @author Benjamin Allan-Rahill
 */
addEventListener("fetch", (event) => {
  event.respondWith(eventHandler(event));
});

/**
 * Class to handle dynamic elements
 */
class ElementHandler {
  element(element) {
    // Change the title
    if (element.tagName == "title") {
      element.setInnerContent("TITLE");
    }
    // Change the Main title
    if (element.tagName == "h1") {
      element.setInnerContent(
        pickRand(["Labrador Retriever", "German Shepard"])
      );
    }
  }
}

var verOne = true;

/**
 * Respond with random variant page
 * @param {FetchEvent} event
 */
async function eventHandler(event) {
  // await the fetch response
  const response = await fetch(
    "https://cfw-takehome.developers.workers.dev/api/variants"
  );

  // parse the response object into JSON
  const data = await response.json();

  // select the variants from the JSON
  const variants = await data.variants;

  // Use selectURL to pick a random URL from the variants
  var url = await switchVariant(variants);

  // fetch the content of the URL
  var res = await fetch(url);

  // Make elements dynamic
  let newRes = new HTMLRewriter().on("*", new ElementHandler()).transform(res);

  // return the new response
  return newRes;
}

switchVariant = (vars) => {
  if (verOne) {
    verOne = !verOne;
    return vars[0];
  } else {
    verOne = !verOne;
    return vars[1];
  }
};

/**
 * Funtion to pick a random elt from a list
 * @param {Array} arr
 */
const pickRand = (arr) => {
  let i = Math.floor(Math.random() * arr.length);
  return arr[i];
};
