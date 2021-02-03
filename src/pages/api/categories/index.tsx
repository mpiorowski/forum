import { NextApiRequest, NextApiResponse } from "next";
import { Pool, QueryResult } from "pg";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pool = new Pool();
  const client = await pool.connect();
  let response: QueryResult;
  try {
    await client.query("BEGIN");
    if (req.method === "GET") {
      const selectAllCategories = `select * from forum_categories`;
      response = await client.query(selectAllCategories);
    } else if (req.method === "POST") {
      const category = JSON.parse(req.body);
      console.log(category);
      
      const addCategory = `insert into forum_categories (title, description, "fkUserId", icon) values('${category.title}', '${category.description}', 1, 'test')`;
      response = await client.query(addCategory);
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
  return res.status(200).send(response.rows);
}
