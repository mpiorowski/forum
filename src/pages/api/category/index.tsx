import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Pool } from "pg";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
    const queryText = `INSERT INTO public.forum_categories
  (category_title, category_description, category_icon, fk_user_id, uid, "version", is_active, is_deleted, created_at, updated_at)
  VALUES('test', 'test', 'test', 1, uuid_generate_v4(), 1, true, false, now(), now());
  `;
    const pool = new Pool();
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const res = await client.query(queryText);
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }

    return res.status(200).json({ name: "John Doe" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
