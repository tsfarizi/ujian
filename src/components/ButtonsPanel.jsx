import AnimatedButton from "./button/AnimatedButton";
import PropTypes from 'prop-types';

function ButtonsPanel({ onRunCode, onSubmitCode, isSubmitting }) {
  return (
    <div className="w-full flex justify-around">
      <AnimatedButton onClick={onRunCode} text="RUN CODE" disabled={false}/>
      <AnimatedButton onClick={onSubmitCode} text="SUBMIT CODE" disabled={isSubmitting}/>
    </div>
  );
}

ButtonsPanel.propTypes = {
  onRunCode : PropTypes.func,
  onSubmitCode : PropTypes.func,
  isSubmitting: PropTypes.bool
};

export default ButtonsPanel;
