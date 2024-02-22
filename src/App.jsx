import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { Toolbar } from "./components/Toolbar";

function App() {
  const [text, setText] = useState(localStorage.getItem("markdownText"));

  const renderText = () => {
    return { __html: marked(text) };
  };

  const texteAreaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("markdownText", text);
  }, [text]);

  const insertText = (before, after) => {
    const textArea = texteAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const previousText = textArea.value;
    const beforeText = previousText.substring(0, start);
    const selectText = previousText.substring(start, end);
    const afterText = previousText.substring(end);

    const newText = `${beforeText}${before}${selectText}${after}${afterText}`;

    setText(newText)
    textArea.focus();
  }

  return (
    <div className="app-container">
      <Toolbar insertText={insertText} />
      <textarea
        ref={texteAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div dangerouslySetInnerHTML={renderText()}></div>
    </div>
  );
}

export default App;
