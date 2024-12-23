/* eslint-disable react/prop-types */
import { useCallback, useState, useEffect } from "react";
import { FaList, FaListOl } from "react-icons/fa";
import { MdFormatBold } from "react-icons/md";
import { ImUnderline } from "react-icons/im";
import { FaStrikethrough } from "react-icons/fa6";
import { PiLinkSimpleBold } from "react-icons/pi";
import { FaItalic } from "react-icons/fa";

const RichTextEditor = ({
  placeholder = "Enter your text here...",
  onContentChange,
  initialContent = "",
  height = "auto",
}) => {
  const [editorRef, setEditorRef] = useState(null);
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [isEmpty, setIsEmpty] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let editorElement = editorRef;

    const handleClick = (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        window.open(e.target.href, "_blank");
      }

      if (editorElement && !editorElement.contains(e.target)) {
        setIsFocused(false);
      }
    };

    if (editorElement) {
      editorElement.addEventListener("click", handleClick);
    }

    document.addEventListener("click", handleClick);

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("click", handleClick);
      }
      document.removeEventListener("click", handleClick);
    };
  }, [editorRef]);

  useEffect(() => {
    // Set initial content if provided
    if (editorRef && initialContent) {
      editorRef.innerHTML = initialContent;
      checkContent();
    }
  }, [initialContent, editorRef]);

  const checkActiveFormats = () => {
    const formats = new Set();
    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");
    if (document.queryCommandState("strikeThrough"))
      formats.add("strikeThrough");
    if (document.queryCommandState("insertOrderedList"))
      formats.add("insertOrderedList");
    if (document.queryCommandState("insertUnorderedList"))
      formats.add("insertUnorderedList");
    setActiveFormats(formats);
  };

  const checkContent = () => {
    if (editorRef) {
      const content = editorRef.innerText.trim();
      setIsEmpty(content === "");
      onContentChange?.(editorRef.innerHTML, content.length);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef) {
      editorRef.focus();
      checkActiveFormats();
      checkContent();
    }
  };

  const handleLink = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (!selectedText) {
      alert("Please select some text first to create a link");
      return;
    }

    const url = prompt("Enter URL:", "https://");
    if (url) {
      const fullUrl = !/^https?:\/\//i.test(url) ? `https://${url}` : url;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;
      document.execCommand("insertHTML", false, tempDiv.innerHTML);
      checkContent();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
      range.insertNode(tabNode);
      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    checkContent();
  };

  const formatButton = (Icon, command, size) => (
    <button
      type="button"
      onClick={() => execCommand(command)}
      className="focus:outline-none group"
    >
      <Icon
        className={`text-[${size}px] cursor-pointer 
        transition-colors duration-200
        ${activeFormats.has(command) ? "text-[#1170CD]" : "text-[#495163]"}
        hover:text-[#1170CD] group-focus:text-[#1170CD]`}
      />
    </button>
  );

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    checkContent();
  };

  const handleSelect = () => {
    checkActiveFormats();
  };

  const handleEditorRef = useCallback((node) => {
    setEditorRef(node);
  }, []);

  return (
    <div className="relative w-full">
      <div className="bg-[#eff2f9] pb-3 rounded-t-md flex items-center px-5 pt-5 gap-5">
        {formatButton(MdFormatBold, "bold", 22)}
        {formatButton(FaItalic, "italic", 17)}
        {formatButton(ImUnderline, "underline", 18)}
        {formatButton(FaStrikethrough, "strikeThrough", 18)}

        <div className="flex items-center border-x-2 justify-center gap-5 w-[100px] border-[#BEC4D5]">
          {formatButton(FaListOl, "insertOrderedList", 19)}
          {formatButton(FaList, "insertUnorderedList", 19)}
        </div>

        <button
          type="button"
          onClick={handleLink}
          className="focus:outline-none group"
        >
          <PiLinkSimpleBold
            className={`text-[19px] cursor-pointer
            transition-colors duration-200
            ${
              document.queryCommandState("createLink")
                ? "text-[#1170CD]"
                : "text-[#9fa6bb]"
            }
            hover:text-[#1170CD] group-focus:text-[#1170CD]`}
          />
        </button>
      </div>

      <div
        dir="ltr"
        style={{ textAlign: "left", height: height }}
        ref={handleEditorRef}
        contentEditable
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
        onPaste={handlePaste}
        onMouseUp={handleSelect}
        onKeyUp={handleSelect}
        onInput={checkContent}
        onFocus={() => setIsFocused(true)}
        onBlur={checkContent}
        className={`min-h-[250px] outline-none caret-blue-500 w-full 
          rounded-b-md bg-[#eff2f9] px-5 pb-5 pt-2 text-[19px] leading-[24px]
          focus:outline-none whitespace-pre-wrap relative
          ${isEmpty ? "empty-editor" : ""} editor-container`}
        data-placeholder={placeholder}
      />

      <div
        className={`border-bottom-animation absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 ease-in-out
        ${isFocused ? "scale-x-100 bg-[#1170CD]" : "scale-x-0 bg-transparent"}`}
      />

      <style jsx>{`
        [contenteditable] a {
          color: #1170cd;
          text-decoration: underline;
          cursor: pointer;
        }

        [contenteditable] ul,
        [contenteditable] ol {
          padding-left: 24px;
          margin: 8px 0;
        }

        [contenteditable] ul li {
          list-style-type: disc;
        }

        [contenteditable] ol li {
          list-style-type: decimal;
        }

        .empty-editor:before {
          content: attr(data-placeholder);
          color: #9fa6bb;
          pointer-events: none;
          position: absolute;
        }

        .border-bottom-animation {
          transform-origin: left;
          transition: transform 0.3s ease-in-out,
            background-color 0.3s ease-in-out;
        }

        .editor-container {
          transition: border-color 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
