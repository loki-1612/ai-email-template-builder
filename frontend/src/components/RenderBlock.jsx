import React from "react";

export default function RenderBlock({ block }) {
  switch (block.type) {
    case "text":
      return (
        <p className="text-gray-700 text-base">
          {block.content}
        </p>
      );

    case "image":
      return (
        <img
          src={block.content}
          alt="preview"
          className="w-full rounded-md"
        />
      );

    case "button":
      return (
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          {block.content.label}
        </button>
      );

    case "divider":
      return <hr className="border-gray-400" />;

    case "footer":
      return (
        <p className="text-sm text-gray-600">{block.content}</p>
      );

    default:
      return null;
  }
}
