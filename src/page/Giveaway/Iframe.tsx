import { useRef, useEffect, useState } from 'react';
import style from './Giveaway.module.scss'

//@ts-ignore
const IframeScrollHandler = ({ src, ...props }) => {
  const iframeRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    //@ts-ignore
    const handleWheel = (event) => {
      if (isHovering) {
        window.scrollBy(0, event.deltaY);
        event.preventDefault();
      }
    };

    if (iframe) {
      //@ts-ignore
      iframe.addEventListener('mouseenter', handleMouseEnter);
      //@ts-ignore
      iframe.addEventListener('mouseleave', handleMouseLeave);
    }

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (iframe) {
        //@ts-ignore
        iframe.removeEventListener('mouseenter', handleMouseEnter);
        //@ts-ignore
        iframe.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering]);

  return (
    <iframe
      title='giveaway'
      ref={iframeRef}
      src={src}
      {...props}
      style={{ height: '100%', ...props.style }}
      className={style.iframe}
    />
  );
};

export default IframeScrollHandler;
