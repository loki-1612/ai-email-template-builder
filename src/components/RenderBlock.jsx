import React from "react";

export default function RenderBlock({ block }) {
  switch (block.type) {
    case "text":
      return (
        <p
          style={{
            textAlign: block.settings.align,
            fontSize: block.settings.fontSize,
            color: block.settings.color,
          }}
        >
          {block.content}
        </p>
      );

    case "image":
      return (
        <img
          className="rounded-lg w-full border"
          src={block.content}
          alt="img-block"
        />
      );

    case "button":
      return (
        <a
          href={block.content.url}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block"
        >
          {block.content.label}
        </a>
      );

    case "divider":
      return <hr className="border-gray-300" />;

    case "footer":
      return <p className="text-gray-600 text-sm">{block.content}</p>;

    default:
      return null;
  }
}
