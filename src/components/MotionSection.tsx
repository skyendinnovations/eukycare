'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

export default function MotionSection(props: HTMLMotionProps<"section">) {
  return <motion.section {...props} />;
}
