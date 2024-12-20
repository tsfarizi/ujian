import { useRef, useCallback, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Editor from "./Editor";
import OutputPanel from "./OutputPanel";
import ButtonsPanel from "./ButtonsPanel";
import ProgramSpecifications from "./ProgramSpecifications";
import usePyodide from "../hooks/usePyodide";
import { uploadCode, submitNumber } from "../api/api";
import PropTypes from 'prop-types';

const CodeEditor = forwardRef(({ code, id, onSubmitEnd, q }, ref) => {
  const editorRef = useRef(null);
  const { runCode, refreshInterpreter, output } = usePyodide();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleEditorMount = useCallback((view) => {
    editorRef.current = view;
    if (code) {
      if (typeof view === 'object' && view.update) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code },
        });
        view.scrollDOM.scrollTop = 0;
      } else if (view instanceof HTMLElement) {
        view.value = code;
        view.scrollTop = 0;
      }
    }
  }, [code]);

  const handleRunCode = useCallback(async () => {
    if (editorRef.current) {
      let codeToRun = '';
      if (typeof editorRef.current === 'object' && editorRef.current.state) {
        codeToRun = editorRef.current.state.doc.toString();
      } else if (editorRef.current instanceof HTMLTextAreaElement) {
        codeToRun = editorRef.current.value;
      }
      try {
        runCode(codeToRun);
        setIsUploading(true);
        setMessage('Uploading code...');
        const response = await uploadCode(id, codeToRun);
        setMessage(response.message || response.error || 'No message returned.');
      } catch (error) {
        console.error('Error uploading code:', error);
        setMessage(error.message || error.error || 'Error uploading code.');
      } finally {
        setTimeout(() => {
          setIsUploading(false);
          setMessage('');
        }, 2000);
      }
    }
  }, [id, runCode]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      setMessage('Submitting code...');
      const submitResponse = await submitNumber(id);
      setMessage(submitResponse.message || submitResponse.error || 'No message returned from submit.');
      setTimeout(() => {
        setIsSubmitting(false);
        setMessage('');
        onSubmitEnd();
      }, 2000);
    } catch (error) {
      console.error('Error submitting code:', error);
      setMessage(error.message || error.error || 'Error submitting code.');
      setTimeout(() => {
        setIsSubmitting(false);
        setMessage('');
        onSubmitEnd();
      }, 2000);
    }
  }, [id, onSubmitEnd]);

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  useEffect(() => {
    if (editorRef.current && code) {
      if (typeof editorRef.current === 'object' && editorRef.current.update) {
        editorRef.current.dispatch({
          changes: { from: 0, to: editorRef.current.state.doc.length, insert: code },
        });
        editorRef.current.scrollDOM.scrollTop = 0;
      } else if (editorRef.current instanceof HTMLTextAreaElement) {
        editorRef.current.value = code;
        editorRef.current.scrollTop = 0;
      }
    }
  }, [code]);

  return (
    <div className="flex flex-col items-center p-4 h-screen bg-gray-900 w-full">
      <div className="flex w-full h-[calc(100%-80px)]">
        <div className="flex-1 p-4">
          <Editor onMount={handleEditorMount} />
        </div>
        <div className="w-1/3 flex flex-col p-4 bg-[#1e1e1e] border border-gray-700 rounded">
          <ProgramSpecifications q={q} />
          <ButtonsPanel
            onRunCode={handleRunCode}
            onSubmitCode={handleSubmit}
            isSubmitting={isSubmitting}
          />
          <OutputPanel
            output={output}
            refreshInterpreter={refreshInterpreter}
          />
          {(isUploading || isSubmitting) && (
            <div className="mt-2 text-yellow-400">{message}</div>
          )}
        </div>
      </div>
      <div className="mt-9 text-gray-500">Made With ❤️ From Indonesia</div>
    </div>
  );
});

CodeEditor.displayName = 'CodeEditor';

CodeEditor.propTypes = {
  code: PropTypes.string,
  id: PropTypes.number.isRequired,
  onSubmitEnd: PropTypes.func.isRequired,
  q: PropTypes.string.isRequired,
}

export default CodeEditor;
