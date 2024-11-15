import style from './Contact.module.scss'
import { ContactForm, ContactInfo, Navbar } from '../../components'

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
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </>
  )
}
