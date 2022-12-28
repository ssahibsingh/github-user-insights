// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql } from "@apollo/client";
import client from "../../lib/apollo-client";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username } = req.body
      const { data } = await client.query({
        query: gql`
        query {
          user(login: "${username}") {
            name
            bio
            company
            repositories(last: 5) {
              totalCount
              nodes {
                name
                url
              }
            }
            followers(last: 5) {
              totalCount
            }
            following(last: 5) {
              totalCount
            }
          }
        }
      `,
      });

      res.json({ success: true, ...data });
    } catch (error) {
      console.log(error)
      res.json({ success: false, error: error.message });
    }

  }
}
