// This file is basically used to style the blogs/blogPosts/blogPreviews
import Image from "next/image";
import React from "react";
import "./index.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import UnlockPotentialContainer from "@/components/unlockPotentialContainer/unlockPotentialContainer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const CustomButton = ({ buttonText, url }) => (
  <a href={url} className="custom-button">
    {buttonText}
  </a>
);

const RichTextRenderer = ({
  richTextDocument,
  hasTakeaways,
  blogTakeaways,
}) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className="my-4">{children}</p>; // Adjust spacing with custom class
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return (
          <ul className="list-disc list-inside list_inline">{children}</ul>
        );
      },
      [BLOCKS.OL_LIST]: (node, children) => {
        return (
          <ol className="list-decimal list-inside list_inline">{children}</ol>
        );
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <li className="my-2 list_inline">{children}</li>;
      },

      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data.target.fields;
        const { url, details } = file;
        const { width, height } = details.image;

        console.log(file);

        return (
          <Image
            src={`https:${url}`}
            alt={title || ""}
            width={width}
            height={height}
          />
        );
      },

      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { buttonText, url } = node.data.target.fields;
        return <CustomButton buttonText={buttonText} url={url} />;
      },

      [INLINES.HYPERLINK]: (node) => {
        return <p>Link</p>;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const text = node.content[0]?.value;
        if (text.includes("{{inline_Takeaways}}") && hasTakeaways) {
          return (
            <div className="my-10 p-2 ">
              <div className="gradient-border p-3 sm:p-12">
                <div>
                  <h4 className="text-[24px] font-bold mb-10 text-[#FFBB9B]">
                    Key Takeaways
                  </h4>
                  <ul>
                    {blogTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="mb-8 text-[18px] dark:text-[#F6F6F6] text-[#252948]"
                      >
                        {" "}
                        <span>•</span> {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        } else if (text.includes("{{inline_Takeaways}}") && !hasTakeaways) {
          return null;
        }

        if (text.includes("{{inline_CTA}}")) {
          return (
            <div className="mb-20">
              <UnlockPotentialContainer />
            </div>
          );
        }
        return (
          <div className="my-4 blogStyling text-[#F6F6F6]">{children}</div>
        );
      },
    },
  };

  return <>{documentToReactComponents(richTextDocument, options)}</>;
};

export default RichTextRenderer;
