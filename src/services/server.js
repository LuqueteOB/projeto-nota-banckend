const express = require("express");
const RotasPublicas = require("../middleware/RotasPublicas");
const RotasPrivadas = require("../middleware/RotasPrivadas");

const host = "localhost";

const port = 3000;

const app = express();
app.use(express.json());

app.get("/", (request, reponse) => {
  return reponse.send("Ola, eu sou um backend com nodejs + express");
});

app.use(RotasPublicas);
app.use(RotasPrivadas);

app.listen(3000, "localhost", () => {
  console.log(`Servidor executando em http://${host}:${port}`);
});
