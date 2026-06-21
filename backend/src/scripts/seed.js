const pool = require("../db");

async function seed() {
  try {
    console.log("Creating 200000 products...");

    await pool.query(`
INSERT INTO products
(name,category,price,created_at,updated_at)

SELECT

'Product ' || gs,

(
ARRAY[
'Electronics',
'Fashion',
'Books',
'Home',
'Sports'
]

)[
floor(random()*5+1)
],

round(
(random()*100000)::numeric,
2
),

NOW()
-
(gs || ' seconds')::interval,

NOW()
-
(gs || ' seconds')::interval

FROM generate_series(
1,
200000
) gs;
`);

    console.log(
      "200000 products inserted"
    );

    process.exit();

  } catch (err) {
    console.log(err);

    process.exit();
  }
}

seed();