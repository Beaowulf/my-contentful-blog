import * as contentful from "contentful";

const getOptions = (isPreview) => {
  return {
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: isPreview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN,
    host: isPreview
      ? process.env.CONTENTFUL_PREVIEW_HOST
      : process.env.CONTENTFUL_HOST,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  };
};

const client = (isPreview) => contentful.createClient(getOptions(isPreview));

export const getAllPosts = async (isPreview = false) => {
  const entries = await client(isPreview).getEntries({
    content_type: "blogTest", // Ensure this matches your Contentful content type ID
  });
  console.log(entries); // Inspect the structure of the entries returned
  return entries.items;
};

export const getPostBySlug = async (slug, isPreview = false) => {
  const entries = await client(isPreview).getEntries({
    content_type: "blogTest", // Ensure this matches your Contentful content type ID
    "fields.slug": slug,
  });
  return entries.items[0];
};
