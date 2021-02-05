import { NextApiRequest, NextApiResponse } from "next";
import { getSession, Session } from "next-auth/client";
import { Pool, QueryResult } from "pg";
import { Category } from "../../../../components/forum/_common/forumTypes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (session) {
    const data = await categoryApi(req.method, JSON.parse(req.body), session);
    return res.status(200).send(data);
  } else {
    res.status(401).send([]);
  }
  res.end();
}

export const categoryApi = async (method: string, body: any, session?: Session) => {
  const pool = new Pool();
  const client = await pool.connect();
  let response: QueryResult<Category>;
  console.log(body);
  
  try {
    await client.query("BEGIN");
    if (method === "GET") {
      response = await client.query(`select * from forum_categories where uuid = '${body.categoryUuid}'`);
      console.log(response.rows);
    } else if (method === "POST") {
      const userId = await client.query(`select id from users where email = '${session.user.email}'`);
      const addCategory = `insert into forum_categories (title, description, userid, icon) values('${body.title}', '${body.description}', ${userId.rows[0].id}, 'test')`;
      response = await client.query(addCategory);
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
  return JSON.stringify(response.rows[0]);
};
