// pages/api/revalidate.js

export default async function handler(req, res) {
  if (req.query.secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  const { slug } = req.body.fields;

  if (!slug) {
    return res.status(400).json({ message: "Missing slug" });
  }

  try {
    await res.revalidate(`/posts/${slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Error revalidating" });
  }
}
