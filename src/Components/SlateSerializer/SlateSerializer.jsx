/* eslint-disable no-unused-vars */


// Serialization function to convert Slate value to readable text
export const serializeToPlainText = (value) => {
  return value
    .map((node) =>
      node.children
        .map((child) => (typeof child.text === "string" ? child.text : ""))
        .join("")
    )
    .join("\n");
};

// Rich text serializer with formatting
export const serializeToHTML = (value) => {
  return value.map((node, index) => {
    switch (node.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-2">
            {node.children.map((child, childIndex) => {
              let content = child.text || "";

              if (child.bold) {
                content = <strong key={childIndex}>{content}</strong>;
              }
              if (child.italic) {
                content = <em key={childIndex}>{content}</em>;
              }
              if (child.underline) {
                content = <u key={childIndex}>{content}</u>;
              }
              if (child.code) {
                content = (
                  <code
                    key={childIndex}
                    className="bg-blue-50 text-blue-800 px-1 rounded"
                  >
                    {content}
                  </code>
                );
              }

              return content;
            })}
          </p>
        );

      case "numbered-list":
        return (
          <ol key={index} className="list-decimal pl-6 mb-2">
            {node.children.map((listItem, liIndex) => (
              <li key={liIndex}>
                {listItem.children.map((child, childIndex) => child.text)}
              </li>
            ))}
          </ol>
        );

      case "bulleted-list":
        return (
          <ul key={index} className="list-disc pl-6 mb-2">
            {node.children.map((listItem, liIndex) => (
              <li key={liIndex}>
                {listItem.children.map((child, childIndex) => child.text)}
              </li>
            ))}
          </ul>
        );

      case "link":
        return (
          <a
            key={index}
            href={node.url}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.children.map((child) => child.text)}
          </a>
        );

      default:
        return null;
    }
  });
};
