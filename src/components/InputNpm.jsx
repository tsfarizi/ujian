import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const InputNPM = ({ value, onChange, shake }) => {
  const shakeVariants = {
    shake: {
      x: [-10, 10, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
    steady: {
      x: 0,
    },
  };

  return (
    <motion.div
      className="flex items-center bg-black px-4 py-2 gap-2 rounded-lg"
      animate={shake ? 'shake' : 'steady'}
      variants={shakeVariants}
    >
      <p className="text-sm text-white">
        <span className="text-[#E879F9]">user</span>
        <span className="text-[#2DD4BF]">@ujian-1ia17</span>:
        <span className="text-[#A78BFA]">~</span>$
      </p>
      <input
        className="bg-transparent border-0 outline-none text-white placeholder-gray-400 w-36"
        placeholder="npm"
        type="text"
        value={value}
        onChange={onChange}
      />
    </motion.div>
  );
};

InputNPM.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  shake: PropTypes.bool.isRequired,
};

export default InputNPM;