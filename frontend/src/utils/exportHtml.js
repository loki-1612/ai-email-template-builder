import React from "react";

export function exportEmailHtml(blocks) {
  const content = blocks
    .map((block) => {
      if (block.type === "text") {
        return `<p style="font-size:16px; line-height:1.6;">${block.content}</p>`;
      }

      if (block.type === "image") {
        return `<img src="${block.content}" style="max-width:100%;" />`;
      }

      if (block.type === "button") {
        return `
          <a href="${block.content.url}"
             style="display:inline-block;padding:10px 16px;
             background:#2563eb;color:#fff;text-decoration:none;
             border-radius:6px;">
            ${block.content.label}
          </a>
        `;
      }

      if (block.type === "divider") {
        return `<hr style="margin:20px 0;" />`;
      }

      if (block.type === "footer") {
        return `<p style="font-size:12px;color:#64748b;">${block.content}</p>`;
      }

      return "";
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Template</title>
</head>
<body style="font-family:Arial,sans-serif;background:#f8fafc;padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;padding:24px;">
    ${content}
  </div>
</body>
</html>
`;
}
