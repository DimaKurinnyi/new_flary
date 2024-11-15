import { motion, useAnimation } from 'framer-motion';

//@ts-ignore
export const Animate = ({ children, custom }) => {
  const mainControls = useAnimation();

  return (
    <div style={{ position: 'relative', width: 'fit-object' }}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: { delay: 0.25 * custom, duration: 1.5 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        animate={mainControls}
        viewport={{ once: true }}>
        {children}
      </motion.div>
      {/* <motion.div
        variants={{
          hidden: {
            left: 0,
          },
          visible: {
            left: '100%',
            transition:{ ease:"easeIn" , duration: 0.5,delay: 0.25 * custom }
          },
        }}
        initial="hidden"
        whileInView="visible"
        animate={second}
        viewport={{ once: true }}
        style={{ position: 'absolute', top:4,bottom:4,left:0,right:0,zIndex:20,background:'var(--color-text-yellow)' }}>
            
      </motion.div> */}
    </div>
  );
};
