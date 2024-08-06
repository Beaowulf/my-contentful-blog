import Image from "next/image";
import React from "react";
import "./index.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import UnlockPotentialContainer from "@/components/unlockPotentialContainer/unlockPotentialContainer";

const CustomButton = ({ buttonText, url }) => (
  <a href={url} className="custom-button">
    {buttonText}
  </a>
);

const RichTextRenderer = ({
  richTextDocument,
  hasTakeaways,
  blogTakeaways = [],
}) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const text = node.content[0]?.value || "";

        if (text.includes("{{inline_Takeaways}}") && hasTakeaways) {
          return (
            <div className="my-10 p-2 gradientBorderParrent">
              <div className="gradientBorderChild p-3 sm:p-6">
                <div>
                  <h4 className="text-[24px] font-bold mb-10 text-[#FFBB9B]">
                    Key Takeaways
                  </h4>
                  <ul>
                    {blogTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="mb-8 text-[18px] text-[#F6F6F6]"
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

      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc list-inside list_inline">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal list-inside list_inline">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="my-2 list_inline">{children}</li>
      ),
      [BLOCKS.HEADING_1]: (node, children) => {
        return <h1 className="text-3xl font-bold my-4">{children}</h1>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2 className="text-2xl font-bold my-4">{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3 className="text-xl font-bold my-4">{children}</h3>;
      },

      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data.target.fields;
        const { url, details } = file;
        const { width, height } = details.image;

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
      [INLINES.HYPERLINK]: (node) => (
        <a href={node.data.uri}>{node.content[0].value}</a>
      ),
    },
  };

  return <>{documentToReactComponents(richTextDocument, options)}</>;
};

export default RichTextRenderer;
