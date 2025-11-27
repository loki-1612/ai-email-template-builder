import React from "react";

export default function RenderBlock({ block }) {
  switch (block.type) {
    case "text":
      return (
        <div className="bg-gray-100 p-4 rounded-lg shadow text-gray-800">
          Sample text goes here…
        </div>
      );

    case "image":
      return (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <img
            className="rounded-lg w-full border"
            src="https://via.placeholder.com/400x200"
            alt="placeholder"
          />
        </div>
      );

    case "button":
      return (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Click Me
          </button>
        </div>
      );

    case "divider":
      return (
        <div className="bg-gray-100 p-2 rounded-lg shadow">
          <hr className="border-gray-400" />
        </div>
      );

    case "footer":
      return (
        <div className="bg-gray-100 p-4 rounded-lg shadow text-gray-700">
          @LK Web Builder — All rights reserved.
        </div>
      );

    default:
      return null;
  }
}
