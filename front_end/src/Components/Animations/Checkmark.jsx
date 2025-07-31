import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCheckmark = ({speed}) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="lightgreen" // Set stroke color to green
    strokeWidth={2} // Increase stroke width for a bolder checkmark
  width="100%"
  height="100%"
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: speed }}
    />
  </motion.svg>
);

export default AnimatedCheckmark;
