import { ContactForm, ContactInfo, FAQ, Navbar } from '../../components';
import style from './Contact.module.scss';

export const Contact = () => {
  const buttonContent = [
    { link: '/how-to-buy', tittle: 'How To Buy' },
    // { link: '/giveaway', tittle: 'Win $333K' },
  ];
  return (
    <>
      <Navbar navLink={buttonContent} />
      <div className={style.Contact}>
        <h1 className={style.header}>Contact Us</h1>
        <div className={style.content}>
          <FAQ />
          <ContactForm />
        </div>
        <ContactInfo />
      </div>
    </>
  );
};
