import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import InputNPM from './InputNPM';
import AnimatedButton from './button/AnimatedButton';

const StartSection = ({ onStart }) => {
  const [npm, setNpm] = useState('');
  const [shakeInput, setShakeInput] = useState(false);

  const handleInputChange = (e) => {
    setNpm(e.target.value);
  };

  const handleStartClick = () => {
    const isValid = /^\d{8}$/.test(npm);
    if (isValid) {
      onStart(npm);
    } else {
      setShakeInput(true);
      setTimeout(() => {
        setShakeInput(false);
      }, 500);
    }
  };

  return (
    <motion.div
      key="startSection"
      className="absolute inset-0 flex items-center justify-around"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-row justify-around gap-10">
        <InputNPM value={npm} onChange={handleInputChange} shake={shakeInput} />
        <AnimatedButton text="Start" onClick={handleStartClick} />
      </div>
    </motion.div>
  );
};

StartSection.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartSection;
