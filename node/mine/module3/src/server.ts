import {createServer, IncomingMessage, Server, ServerResponse} from "http"
// import { json } from "stream/consumers";

const server:Server = createServer((req:IncomingMessage, res:ServerResponse) => {
//   console.log("Request:", req);
//   console.log("Response:", res);

//   console.log("Request url:", req.url);
//   console.log("Request method:", req.method);

// if(req.url ==="/" && req.method === "GET"){
//     res.writeHead(200,{"Content-Type":"text/plain"}),
//     res.end("Home Page");
// }else if(req.url ==="/about" && req.method === "GET"){
//     res.writeHead(200,{"Content-Type":"text/plain"}),
//     res.end("About Page");
// }
// else{
//     res.writeHead(404,{"COntent-Type":"text/plain"}),
//     res.end("route not found")
// }
if(req.url ==="/" && req.method === "GET"){
    res.writeHead(200,{"Content-Type":"application/json"}),
    res.end(JSON.stringify({message:"Home Page"}));
}else if(req.url ==="/about" && req.method === "GET"){
    res.writeHead(200,{"Content-Type":"application/json"}),
    res.end(JSON.stringify({message:"About Page"}));
}
else{
    res.writeHead(404,{"Content-Type":"application/json"}),
    res.end(JSON.stringify({error:"route not found"}))
}

// ai generated
// if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write("<h1>Home Page</h1>");
//     res.end();
// } else if (req.url === "/about" && req.method === "GET") {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write("<h1>About Page</h1>");
//     res.end();
// } else {
//     res.writeHead(404, {"Content-Type": "text/html"});
//     res.write("<h1>404 Not Found</h1>");
//     res.end();
// }
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});