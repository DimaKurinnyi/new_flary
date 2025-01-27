import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import style from './ContactForm.module.scss';

export const ContactForm = () => {
  const form = useRef();
  //@ts-ignore
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_uhw8slr',
        'template_5omh1yw',
        //@ts-ignore
        form.current,
        'gaWz-pkJdZjnKYvxA',
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    e.target.reset();
  };

  const animation = {
    hidden: {
      x: 75,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <>
      <motion.form
        //@ts-ignore
        ref={form}
        onSubmit={sendEmail}
        className={style.ContactForm}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
        <div className={style.Contact}>
          <h3>Contact form</h3>

          <p className={style.description}>If you have more questions? Write to us!</p>
        </div>
        <motion.div
          className={style.entreated}
          variants={animation}
          transition={{ duration: '1', delay: 0.25 }}>
          <input type="text" required name="name" />
          <div className={style.labelLine}>Enter your name</div>
        </motion.div>
        <motion.div
          className={style.entreated}
          variants={animation}
          transition={{ duration: '1', delay: 0.5 }}>
          <input type="email" required name="email" />
          <div className={style.labelLine}>Enter your email</div>
        </motion.div>
        <motion.div
          className={style.entreated}
          variants={animation}
          transition={{ duration: '1', delay: 0.75 }}>
          <textarea rows={2} required name="message_new" />
          <div className={style.labelLine}>Enter your message...</div>
        </motion.div>
        <motion.button
          type="submit"
          variants={animation}
          transition={{ duration: '1', delay: 0.75 }}>
          {' '}
          Send message
        </motion.button>
      </motion.form>
    </>
  );
};
