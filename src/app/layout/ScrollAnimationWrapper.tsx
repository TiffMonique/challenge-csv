import { motion } from "framer-motion";
import { ScrollAnimationProps } from "../interfaces";

export default function ScrollAnimationWrapper({ children, className, ...props }: ScrollAnimationProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}