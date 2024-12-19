import PropTypes from 'prop-types';

function ProgramSpecifications({ q }) {
  return (
    <div className="flex-1 mb-4 text-gray-400 overflow-y-auto border border-gray-700 rounded p-4 max-h-[300px] overflow-auto custom-scrollbar">
      <strong>Program Specifications</strong>
      <p className="mt-2 text-sm">
        {q}
      </p>
    </div>
  );
}

ProgramSpecifications.propTypes = {
  q: PropTypes.string.isRequired,
}

export default ProgramSpecifications;
