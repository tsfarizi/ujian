import { useEffect, useRef } from "react";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { python } from "@codemirror/lang-python";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import PropTypes from "prop-types";

function Editor({ onMount }) {
  const editorRef = useRef(null);

  useEffect(() => {

    const initialDoc = "\n".repeat(10);

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        oneDark,
        python(),
        lineNumbers(),
        EditorView.lineWrapping,
        keymap.of([indentWithTab, ...defaultKeymap]),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    if (onMount) {
      onMount(view);
    }

    return () => {
      view.destroy();
    };
  }, [onMount]);

  return (
    <div
      ref={editorRef}
      className="h-full bg-[#282c34] border border-gray-700 rounded-tl-md overflow-auto custom-scrollbar"
      aria-label="Code editor"
      role="textbox"
      tabIndex="0"
    />
  );  
}

Editor.propTypes = {
  onMount: PropTypes.func,
};

export default Editor;
