// pages/api/preview.js

export default function preview(req, res) {
  if (req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  res.setPreviewData({});
  const slug = req.query.slug || "";
  const path = slug ? `/posts/${slug}` : "/";
  res.writeHead(307, { Location: path });
  res.end();
}
