import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';
import logo from '~/assets/logoMe.png';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classes(styles.monogramContainer, className)}
      {...props}
    >
      {/* Logo Image */}
      <img src={logo} alt="Monogram Logo" />

      {/* Highlight Overlay */}
      {highlight && <div className={styles.highlightOverlay}></div>}
    </div>
  );
});
