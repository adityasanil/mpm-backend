"use strict";
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
async function run() {
  const { body } = await client.search({
    index: "personaldetailss",
    type: "personaldetails",
    body: {
      query: {
        wildcard: {
          firstName: "a*"
        }
      }
    }
  });
  console.log(body.hits.hits);
}
run();
