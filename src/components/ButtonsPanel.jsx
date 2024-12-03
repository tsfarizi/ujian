import AnimatedButton from "./button/AnimatedButton";
import PropTypes from 'prop-types';

function ButtonsPanel({ onRunCode, onSubmitCode }) {
  return (
    <div className="w-full flex justify-around">
      <AnimatedButton onClick={onRunCode} text="RUN CODE" />
      <AnimatedButton onClick={onSubmitCode} text="SUBMIT CODE" />
    </div>
  );
}

ButtonsPanel.propTypes = {
  onRunCode : PropTypes.func,
  onSubmitCode : PropTypes.func
};

export default ButtonsPanel;
