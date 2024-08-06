// pages/posts/[slug].js

import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "../../lib/contentful";
import Image from "next/image";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./index.css";

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const paths = posts
    .map((post) => {
      const slug = post?.fields?.slug;
      if (!slug) {
        console.error(`Post with id ${post.sys.id} does not have a slug`);
      }
      return { params: { slug } };
    })
    .filter((path) => path.params.slug); // Ensure no undefined slugs are included

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getPostBySlug(params.slug, preview);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
      preview,
    },
    revalidate: 60,
  };
}

const Post = ({ post, preview }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const livePost = useContentfulLiveUpdates(post);

  const title = livePost.fields.blogTitle;
  const excerpt = livePost.fields.blogDescription;
  const paragraph = livePost.fields.blogRichTextParagraph;
  // const image = livePost.fields.blogImage;

  return (
    <div className="w-screen h-screen bg-slate-500 pagePaddingLarge">
      <div>
        {preview && <div className="preview-banner">Preview Mode</div>}
        <h1
          {...ContentfulLivePreview.getProps({
            entryId: post.sys.id,
            fieldId: "blogTitle",
          })}
        >
          {title}
        </h1>
        <p
          {...ContentfulLivePreview.getProps({
            entryId: post.sys.id,
            fieldId: "blogDescription",
          })}
        >
          {excerpt}
        </p>
        <div
          {...ContentfulLivePreview.getProps({
            entryId: post.sys.id,
            fieldId: "blogRichTextParagraph",
          })}
        >
          {documentToReactComponents(paragraph)}
        </div>
        {/* {image && (
        <Image
          {...ContentfulLivePreview.getProps({ entryId: post.sys.id, fieldId: 'blogImage' })}
          src={image.fields.file.url}
          alt={image.fields.title}
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.height}
        />
      )} */}
      </div>
    </div>
  );
};

export default Post;
