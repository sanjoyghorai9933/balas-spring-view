const next = require("next");
const http = require("http");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res));

  server.listen(port, "0.0.0.0", () => {
    console.log(`Bala's Spring View running on port ${port}`);
  });
});
