import React from "react";

export default function RenderEmailBlock({ block }) {
  if (!block) return null;

  const settings = block.settings || {};

  switch (block.type) {
    case "text":
      return (
        <p
          className="leading-relaxed whitespace-pre-wrap break-words"
          style={{
            fontSize: `${settings.fontSize || 16}px`,
            textAlign: settings.align || "left",
            color: settings.color || "#1f2937",
            margin: "0",
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
          className="w-full rounded-lg shadow my-3"
        />
      );

    case "button":
      return (
        <div
          style={{
            textAlign: settings.align || "center",
          }}
        >
          <a
            href={block.content.url}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {block.content.label}
          </a>
        </div>
      );

    case "divider":
      return <hr className="border-gray-300 my-6" />;

    case "footer":
      return (
        <p className="text-sm text-gray-500 text-center mt-6">
          {block.content}
        </p>
      );

    default:
      return null;
  }
}
