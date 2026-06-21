const express = require("express");
const cors = require("cors");

const productsRoute =
require("./routes/products");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
"/products",
productsRoute
);

app.get(
"/",
(req, res) => {
res.send(
"CodeVector Backend Running 🚀"
);
}
);

app.listen(
5000,
() =>
console.log(
"Server running on 5000"
)
);