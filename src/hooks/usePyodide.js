import { useEffect, useRef, useState } from "react";

export default function usePyodide() {
  const pyodideRef = useRef(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  const loadInterpreter = async () => {
    setLoading(true);
    setOutput("Loading interpreter...");
    try {
      pyodideRef.current = await window.loadPyodide();
      setOutput("Interpreter loaded. Ready to run Python!");
    } catch (error) {
      setOutput(`Error loading Interpreter: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(loadInterpreter, 500);
  }, []);

  const runCode = async (code) => {
    if (loading) {
      setOutput("Interpreter is still loading. Please wait...");
      return;
    }

    if (!pyodideRef.current) {
      setOutput("Interpreter failed to load.");
      return;
    }

    try {
      pyodideRef.current.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      await pyodideRef.current.runPythonAsync(code);

      const result = pyodideRef.current.runPython("sys.stdout.getvalue()");

      setOutput(result || "No output");
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      pyodideRef.current.runPython(`
import sys
sys.stdout = sys.__stdout__
      `);
    }
  };

  const refreshInterpreter = async () => {
    setLoading(true);
    setOutput("Refreshing interpreter...");
    try {
      pyodideRef.current = await window.loadPyodide();
      setOutput("Interpreter refreshed. Ready to run Python!");
    } catch (error) {
      setOutput(`Error refreshing Interpreter: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { runCode, refreshInterpreter, output, loading };
}
