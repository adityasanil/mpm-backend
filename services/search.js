"use strict";

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
async function run(req) {
  const { body } = await client.search({
    index: "personaldetailss",
    type: "personaldetails",
    body: {
      query: {
        match: {
          firstName: req
        }
      }
    }
  });
  //   console.log(body.hits.hits);
  return body;
}
run("aditya");

exports.run = run;
