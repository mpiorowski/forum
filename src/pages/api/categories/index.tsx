import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Pool, QueryResult } from "pg";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (session) {
    const pool = new Pool();
    const client = await pool.connect();
    let response: QueryResult;
    try {
      await client.query("BEGIN");
      if (req.method === "GET") {
        response = await client.query(`select * from forum_categories`);
      } else if (req.method === "POST") {
        const category = JSON.parse(req.body);
        const userId = await client.query(`select id from users where email = '${session.user.email}'`);
        const addCategory = `insert into forum_categories (title, description, userid, icon) values('${category.title}', '${category.description}', ${userId.rows[0].id}, 'test')`;
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
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
