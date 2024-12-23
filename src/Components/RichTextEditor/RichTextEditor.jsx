/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useMemo, useCallback, useState } from "react";
import { createEditor, Transforms, Editor } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { withHistory } from "slate-history";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdLink,
  MdCode,
  MdCheckBox,
} from "react-icons/md";

// Enhanced CustomEditor with sophisticated list handling
const CustomEditor = {
  isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  toggleList(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);

    Transforms.setNodes(
      editor,
      {
        type: isActive ? "paragraph" : format,
        children: isActive
          ? [{ text: "" }]
          : [{ type: "list-item", children: [{ text: "" }] }],
      },
      { match: (n) => Editor.isBlock(editor, n) }
    );

    // If converting to a list, wrap in list container
    if (!isActive) {
      Transforms.wrapNodes(editor, {
        type: format,
        children: [],
      });
    }
  },

  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });
    return !!match;
  },

  insertLink(editor, url) {
    if (editor.selection) {
      wrapLink(editor, url);
    }
  },
};

// Modern styled toolbar button
const ToolbarButton = ({ icon: Icon, action, isActive = false, label }) => (
  <button
    onMouseDown={(e) => {
      e.preventDefault();
      action();
    }}
    className={`
      group relative p-2 rounded-lg  transition-all duration-300
      ${
        isActive
          ? "bg-blue-100 text-blue-600 shadow-md"
          : "hover:bg-gray-100 hover:shadow-sm"
      }
      focus:outline-none focus:ring-2 focus:ring-blue-300
    `}
    aria-label={label}
  >
    <Icon
      className={
        " w-5 h-5   transform group-hover:scale-110 transition-transform"
      }
    />
    <span
      className="
        absolute top-[-20px] left-1/2 transform -translate-x-1/2
        bg-gray-800 text-white text-xs px-2 py-1 rounded
        opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none
      "
    >
      {label}
    </span>
  </button>
);

// Advanced Toolbar with modern design
const Toolbar = () => {
  const editor = useSlate();

  const openLinkPrompt = () => {
    const url = prompt("Enter the URL for the link");
    if (url && editor.selection) {
      CustomEditor.insertLink(editor, url);
    }
  };

  const toolbarActions = [
    {
      icon: MdFormatBold,
      action: () => CustomEditor.toggleMark(editor, "bold"),
      isActive: CustomEditor.isMarkActive(editor, "bold"),
      label: "Bold",
    },
    {
      icon: MdFormatItalic,
      action: () => CustomEditor.toggleMark(editor, "italic"),
      isActive: CustomEditor.isMarkActive(editor, "italic"),
      label: "Italic",
    },
    {
      icon: MdFormatUnderlined,
      action: () => CustomEditor.toggleMark(editor, "underline"),
      isActive: CustomEditor.isMarkActive(editor, "underline"),
      label: "Underline",
    },
    {
      icon: MdCode,
      action: () => CustomEditor.toggleMark(editor, "code"),
      isActive: CustomEditor.isMarkActive(editor, "code"),
      label: "Code",
    },
    {
      icon: MdFormatListNumbered,
      action: () => CustomEditor.toggleList(editor, "numbered-list"),
      isActive: CustomEditor.isBlockActive(editor, "numbered-list"),
      label: "Ordered List",
    },
    {
      icon: MdFormatListBulleted,
      action: () => CustomEditor.toggleList(editor, "bulleted-list"),
      isActive: CustomEditor.isBlockActive(editor, "bulleted-list"),
      label: "Unordered List",
    },
    {
      icon: MdLink,
      action: openLinkPrompt,
      isActive: false,
      label: "Insert Link",
    },
    {
      icon: MdCheckBox,
      action: () => CustomEditor.toggleList(editor, "task-list"),
      isActive: CustomEditor.isBlockActive(editor, "task-list"),
      label: "Task List",
    },
  ];

  return (
    <div
      className="
        flex w-[45%] py-2 px-2 justify-between items-center
      "
    >
      {toolbarActions.map((action) => (
        <ToolbarButton key={action.label} {...action} />
      ))}
    </div>
  );
};

// Enhanced Element rendering with modern styling
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "numbered-list":
      return (
        <ol
          {...attributes}
          className="
            pl-6 my-3
            list-decimal list-outside
            text-gray-800
            marker:text-blue-600
            marker:font-semibold
            marker:text-lg
          "
        >
          {children}
        </ol>
      );
    case "bulleted-list":
      return (
        <ul
          {...attributes}
          className="
            pl-6 my-3
            list-none
            space-y-2
          "
        >
          {children}
        </ul>
      );
    case "list-item":
      return (
        <li
          {...attributes}
          className="
            flex items-start gap-2
            text-gray-800 text-sm
            hover:text-blue-600 transition-colors
          "
        >
          {/* Small Circle as Bullet */}
          {element.type === "bulleted-list" && (
            <span className="w-2 h-2 bg-gray-600 rounded-full mt-[6px]"></span>
          )}
          {children}
        </li>
      );
    case "link":
      return (
        <a
          {...attributes}
          href={element.url}
          className="
            text-blue-600 hover:text-blue-800
            underline decoration-blue-300
            hover:decoration-blue-600
            transition-colors duration-300
          "
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    default:
      return (
        <p {...attributes} className="my-2 text-gray-800">
          {children}
        </p>
      );
  }
};

// Enhanced Leaf rendering with modern styling
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong className="font-bold text-gray-900">{children}</strong>;
  }
  if (leaf.italic) {
    children = <em className="italic text-gray-700">{children}</em>;
  }
  if (leaf.underline) {
    children = <u className="underline decoration-blue-500">{children}</u>;
  }
  if (leaf.code) {
    children = (
      <code
        className="
          bg-blue-50 text-blue-800
          px-1.5 py-0.5 rounded-md
          font-mono text-sm
          border border-blue-200
        "
      >
        {children}
      </code>
    );
  }
  return <span {...attributes}>{children}</span>;
};

// Modern Rich Text Editor with enhanced design
const RichTextEditor = ({
  initialValue = [{ type: "paragraph", children: [{ text: "" }] }],
  placeholder,
  onChange = () => {},
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [isFocused, setIsFocused] = useState(false);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <>
      <div className="relative">
        <div
          className="max-w-[100%] min-h-[250px]  mx-auto
        bg-[#eff2f9]
         rounded-md "
        >
          <Slate
            editor={editor}
            onChange={(value) => {
              // Call the onChange prop with the current value
              onChange(value);
            }}
            initialValue={initialValue}
          >
            <Toolbar />
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder={placeholder}
              className="
             px-6 pb-3
            text-gray-800
            text-left
            focus:outline-none
            leading-relaxed
            selection:bg-blue-200
          "
              onFocus={() => setIsFocused(true)} // Trigger onFocus
              onBlur={() => setIsFocused(false)} // Trigger onBlur
            />
          </Slate>{" "}
        </div>
        <div
          className={`absolute bottom-0 h-[2.5px] bg-blue-500 transition-all duration-500 ease-out ${
            isFocused ? "w-full" : "w-0"
          }`}
        ></div>
      </div>
    </>
  );
};

// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: "" }],
//   },
// ];
export default RichTextEditor;
