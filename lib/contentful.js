// lib/contentful.js

import * as contentful from "contentful";

const getOptions = (isPreview) => {
  return {
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: isPreview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN,
    host: isPreview ? "preview.contentful.com" : "cdn.contentful.com",
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  };
};

const client = (isPreview) => contentful.createClient(getOptions(isPreview));

export const getAllPosts = async (isPreview = false) => {
  const entries = await client(isPreview).getEntries({
    content_type: "blogTest", // Ensure this matches your Contentful content type ID
    select: "fields.slug", // Only fetch the fields you need
  });

  return entries.items.filter((entry) => entry?.fields?.slug);
};

export const getPostBySlug = async (slug, isPreview = false) => {
  const entries = await client(isPreview).getEntries({
    content_type: "blogTest",
    "fields.slug": slug,
    select:
      "fields.blogTitle,fields.blogTakeaways,fields.blogDescription,fields.blogRichTextParagraph", // Only fetch the necessary fields
  });

  console.log("🚀 ~ entries ~ entries:", entries);

  return entries.items[0];
};
