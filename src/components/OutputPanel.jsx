import PropTypes from 'prop-types';

function OutputPanel({ output, refreshInterpreter }) {
  return (
    <div
      className="custom-scrollbar mt-4 p-4 bg-[#282c34] text-white border border-gray-700 rounded overflow-y-auto max-h-[200px] break-words"
    >
      <div className="flex justify-between items-center mb-2">
        <strong>Output:</strong>
        <button
          onClick={refreshInterpreter}
          className="flex items-center justify-center text-gray-400 hover:text-gray-200 focus:outline-none"
          title="Refresh Interpreter"
          aria-label="Refresh Interpreter"
        >
          Refresh
        </button>
      </div>
      {output === "" ? (
        <div className="text-gray-500 italic">
          Loading interpreter, please wait...
        </div>
      ) : (
        <pre className="mt-2 whitespace-pre-wrap">{output}</pre>
      )}
    </div>
  );
}

OutputPanel.propTypes = {
    output : PropTypes.string,
    refreshInterpreter : PropTypes.func
};

export default OutputPanel;
