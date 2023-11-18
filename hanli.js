const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const productData = JSON.parse(data);
// This is server
const server = http.createServer((req, res) => {
  // console.log("Hello Client I am server.");
  let pathname = req.url;
  if (pathname === "/") res.end("Hello Guys");
  else if (pathname === "/han") res.end("Hay Han I love you.");
  else if (pathname === "/li") res.end("Hay Li I miss you");
  else if (pathname === "/zaw") res.end("Hay Sweet Girl ,");
  else if (pathname === "/mylove") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end("<h1>I miss you so much HanLi!</h1>");
    console.log("Han Li Zaw (or) My Love💜");
  } else if (pathname === "/api") {
    res.writeHead(200,{
      "content-type":"application/json"
    })
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    // const productData = JSON.parse(data);
    res.end(data);
    console.log(data);
    // });
  } else {
    res.writeHead(400, "text/html");
    res.end("<h1>NO PAGE FOUND!</h1>");
  }
});
// This is address of server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server is Listening on port 8000.....");
});
// This is js code for diretory name
// let dir = __dirname;
// console.log(dir);