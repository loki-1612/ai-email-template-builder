import React from "react";
export default function RenderEmailBlock({ block }) {
  switch (block.type) {
    case "text":
      return (
        <p
        className="text-gray-800 leading-relaxed whitespace-pre-wrap wrap-break-word"
        style={{
          fontSize: block.settings.fontSize,
          textAlign: block.settings.align,
          color: block.settings.color,
          }}
        >
          {block.content}
        </p>

      );

    case "image":
      return (
        <img
          src={block.content}
          alt="email"
          className="w-full rounded-lg shadow"
        />
      );

    case "button":
      return (
        <div className="text-center">
          <a
            href={block.content.url}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            {block.content.label}
          </a>
        </div>
      );

    case "divider":
      return <hr className="border-gray-300 my-4" />;

    case "footer":
      return (
        <p className="text-sm text-gray-600 text-center">
          {block.content}
        </p>
      );

    default:
      return null;
  }
}
