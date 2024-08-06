import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "../../lib/contentful";
import Image from "next/image";
import Link from "next/link";
import RichTextRenderer from "@/components/richTetxtRenderer";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import ShareButton from "@/components/shareButton";
import blogPostBG from "@/public/assets/blogPostBG.jpg";
import DynamicPurpleBar from "@/components/dynamicPurpleBar";
import clockIcon from "@/public/assets/clockIcon.svg";
import hashtagIcon from "@/public/assets/hashtagIcon.svg";
import calendarIcon from "@/public/assets/calendarIcon.svg";
import { MainButton, AboutButtonDarkBG } from "@/components/buttons";
import CryptoPreviewTables from "@/components/cryptoTables/cryptoTables";
import adImg from "@/public/assets/adImg.png";
import "./index.css";
import Navbar from "@/ui/navbar";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

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

  function formatDateString(isoString, locale = "en-GB") {
    const date = new Date(isoString);
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  console.log(post);

  const blogUrl = typeof window !== "undefined" ? window.location.href : "";

  const livePost = useContentfulLiveUpdates(post);

  const title = livePost.fields.blogTitle;
  const excerpt = livePost.fields.blogDescription;
  const paragraph = livePost.fields.blogRichTextParagraph;
  const blogAuthor = livePost.fields.blogAuthor;
  const createtAt = livePost.fields.blogImage.sys.createdAt;
  const locale = livePost.fields.blogImage.sys.locale;
  const blogTakeaways = livePost.fields.blogTakeaways || [];

  function countWords(str) {
    return str.split(/\s+/).filter((word) => word !== "").length;
  }
  const plainText = documentToPlainTextString(paragraph);
  const wordCount = countWords(plainText);
  const minsToRead = Math.ceil(wordCount / 210);

  return (
    <div className="  ">
      <Navbar />
      <div className=" pagePaddingLarge mt-10">
        <DynamicPurpleBar inBlogPost={true} blogTitle={title} />

        <div className="flex flex-col lg:flex-row gap-10 mt-20">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-9/12">
            <div className="px-4 ">
              {/* blog title */}
              <h1 className="text-[24px] md:text-[35px] text-center md:text-left leading-10 text-[#F6F6F6] font-bold mb-10 md:mb-20">
                {title}
              </h1>

              {/* written by - icons - share article  */}
              <div className="w-full flex md:flex-row flex-col justify-between items-center gap-4 text-[#F6F6F6]">
                <div>
                  <p className="text-[#F6F6F6]">Written By {blogAuthor}</p>
                </div>

                <div className="flex justify-center items-center gap-4">
                  <div className="flex gap-2">
                    <Image src={clockIcon} alt="clock_Icon" />
                    <p className="text-nowrap text-[#F6F6F6]">
                      {minsToRead} min
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Image src={calendarIcon} alt="calendar_Icon" />
                    <p className="text-nowrap text-[#F6F6F6]">
                      {formatDateString(createtAt, locale)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Image src={hashtagIcon} alt="hashtag_Icon" />
                    <p className="text-nowrap text-[#F6F6F6]">
                      {livePost.fields.blogCategory}
                    </p>
                  </div>
                </div>

                <div className="md:flex hidden place-items-center gap-4">
                  <p className="text-nowrap text-[#F6F6F6]">Share article:</p>
                  <ShareButton />
                </div>
              </div>

              {/* blog Image  */}
              <div className="mt-6">
                <Image
                  src={blogPostBG}
                  alt="blog_Post_Image"
                  className="w-auto max-h-450px rounded-[20px]"
                />
              </div>
              <div className="md:hidden w-full flex justify-center mt-6 gap-4">
                <p className="text-nowrap text-[#F6F6F6]">Share article:</p>
                <ShareButton />
              </div>
              <div className="md:hidden block bg-white mt-6 p-10 rounded-[20px]">
                <p className="font-bold leading-6 uppercase text-[18px] text-[#F6F6F6]">
                  Table of contents
                </p>
                <div className="w-full bg-black h-[2px] my-5" />
                <ul className="flex flex-col gap-10">
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> Duis aute irure
                      dolor
                    </p>
                  </li>
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> Lorem ipsum this and
                      that goes here
                    </p>
                  </li>
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> But no more than two
                      lines of content this is enough for a table of contents
                    </p>
                  </li>
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> Duis aute irure
                      dolor in reprehenderit in voluptate
                    </p>
                  </li>
                </ul>
              </div>

              <div className="blogPostWrapper mt-10">
                <RichTextRenderer
                  blogTakeaways={blogTakeaways}
                  hasTakeaways={blogTakeaways.length > 0}
                  richTextDocument={paragraph}
                />
              </div>
              <div className="fullWidthButtonChildren h-[60px] mt-12 md:h-full block md:hidden w-full text-center">
                <Link href="/">
                  <MainButton
                    className="mx-auto w-full p-4"
                    label="LAUNCH APP"
                    hasArrowRight={true}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-3/12">
            <div className="flex flex-col gap-10">
              <div className="bg-white p-2 md:p-5 rounded-[20px]">
                <p className="font-bold leading-6 uppercase text-[18px] text-[#252948]">
                  Table of contents
                </p>
                <div className="w-full bg-black h-[2px] my-5" />
                <ul className="flex flex-col gap-10">
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> Duis aute irure
                      dolor
                    </p>
                  </li>
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> Lorem ipsum this and
                      that goes here
                    </p>
                  </li>
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> But no more than two
                      lines of content this is enough for a table of contents
                    </p>
                  </li>
                  <li>
                    <p className="text-[#252948] text-[15px]">
                      <span className="text-[8px]">●</span> Duis aute irure
                      dolor in reprehenderit in voluptate
                    </p>
                  </li>
                </ul>
              </div>
              <CryptoPreviewTables />
              <div className="flex flex-col gap-10 px-5 pt-8 rounded-[20px] bg-gradient-to-b from-[#FFBB9B] from-10% via-[#FF8FB8] via-60% to-[#AFAFFF] to-80%">
                <h3 className="text-[24px] text-[#1B153C] font-extrabold leading-9 tracking-[-0.72px]">
                  This can be anything you want an ad, a new product anything
                </h3>
                <div className="sm:w-fit w-full featureBorderWrapLightTheme rounded-[20px]">
                  <AboutButtonDarkBG
                    customClass="w-full"
                    hasWhiteArrowRight={true}
                    label={"LEARN MORE"}
                  />
                </div>
                <Image src={adImg} alt="deltaPrime_mascot_Holding_Keys_" />
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* {preview && <div className="preview-banner">Preview Mode</div>}
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
          </div> */}
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
    </div>
  );
};

export default Post;
