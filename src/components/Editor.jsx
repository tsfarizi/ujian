import { useEffect, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { python } from "@codemirror/lang-python";
import { defaultKeymap } from "@codemirror/commands";
import { indentWithTab } from '@codemirror/commands';
import PropTypes from 'prop-types';

function Editor({ onMount }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const startState = EditorState.create({
      doc: "", 
      extensions: [
        oneDark,
        python(),
        EditorView.lineWrapping,
        keymap.of(defaultKeymap),
        keymap.of([indentWithTab]),
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
      className="h-full bg-[#282c34] border border-gray-700 rounded-tl-md overflow-auto"
    />
  );
}

Editor.propTypes = {
  onMount : PropTypes.func
}

export default Editor;