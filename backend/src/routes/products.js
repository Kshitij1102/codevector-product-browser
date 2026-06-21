const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get(
"/",
async (req, res) => {

try {

const limit =
Number(req.query.limit) || 20;

const category =
req.query.category;

const cursor =
req.query.cursor;

let query = `
SELECT
id,
name,
category,
price,
created_at,
updated_at

FROM products

WHERE 1=1
`;

const values = [];

if (category) {

values.push(category);

query += `
AND category=$${values.length}
`;

}

if (cursor) {

values.push(cursor);

query += `
AND updated_at <
$${values.length}
`;

}

query += `

ORDER BY
updated_at DESC,
id DESC

LIMIT ${limit}

`;

const result =
await pool.query(
query,
values
);

const nextCursor =
result.rows.length
? result.rows[
result.rows.length-1
].updated_at
: null;

res.json({

count:
result.rows.length,

nextCursor,

products:
result.rows,

});

}

catch(err){

console.log(err);

res
.status(500)
.json({
error:
"server error"
});

}

}
);

module.exports =
router;