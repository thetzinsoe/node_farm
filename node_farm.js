const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const slugify = require("slugify");
const replaceTemplate = require("./replace_js/replaceTemplate.js");
console.log(slugify("Fresh Avogado", { lower: true }));
// ReadFile
const tempOverview = fs.readFileSync(
  `${__dirname}/template/template_overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/template/template_card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/template/template_product.html`,
  "utf-8"
);
const errpage = fs.readFileSync(`${__dirname}/template/error.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
// const slug = dataObj.map(el => slugify(el.productName,{lower:true}))
// console.log(slug);
const firstName = dataObj.map((el) => el.productName);
console.log(firstName);
console.log(firstName);
// starting server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // console.log(pathname);
  // console.log(query);
  // home page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join();
    let output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
    res.end(output);
    console.log("This is Home Page (or) Overview Page");
    // product page
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(output);
    console.log("This is Product Detail Page");
    //error pgae
  } else {
    res.writeHead(400, {
      "content-type": "text/html",
    });
    res.end(errpage);
    console.log("This is Error Pages");
  }
});
// listening server
server.listen(8001, "127.0.0.1", () => {
  console.log("Server is listeing on port 8001......");
});
