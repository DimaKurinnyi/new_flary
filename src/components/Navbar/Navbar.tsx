import { useState } from 'react';
import logo from '../../assets/Flary Logo.png';
import style from './Navbar.module.scss';

import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import ConnectHeaderMenu from '../ConnectHeaderMenu/ConnectHeaderMenu';

//@ts-ignore
export const Navbar = ({ navLink }) => {
  const params = useLocation().pathname.slice(1);

  const [mobileNav, SetMobileNav] = useState(false);

  const handlerMobileNav = () => {
    SetMobileNav(!mobileNav);
  };

  return (
    <div className={style.Navbar}>
      <div className={style.bgBlur}></div>
      <div className={style.flexbox}>
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <ul className={style.list}>
          <li>
            <Link
              style={params === '' ? { color: '#ffc837' } : {}}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              to="/">
              Home
            </Link>
          </li>

          {navLink.map((item: any, i: any) => (
            // console.log(item.tittle.toLowerCase())
            <li key={i}>
              <Link to={item.link} style={params === item.id ? { color: '#ffc837' } : {}}>
                {item.tittle}
              </Link>
            </li>
          ))}

          <li>
            <Link to="/contact" style={params === 'contact' ? { color: '#ffc837' } : {}}>
              Contact Us
            </Link>
          </li>
          <li>
            {/* <ConnectButton
              accountStatus="address"
              chainStatus="none"
              showBalance={false}
              label="Connect EVM Wallet"
            /> */}
            <ConnectHeaderMenu />
          </li>
          <li>
            {/* <WalletMultiButton /> */}
          </li>
        </ul>
        {/* <Select /> */}
        <div className={style.mobile_button} onClick={handlerMobileNav}>
          <div onClick={(e) => e.stopPropagation()}>
            {/* <ConnectButton
              accountStatus="address"
              chainStatus="none"
              showBalance={false}
              label="Connect Wallet"
            /> */}
            <ConnectHeaderMenu />
          </div>

          {mobileNav ? (
            <FaTimes size={20} style={{ color: '#fff', cursor: 'pointer' }} />
          ) : (
            <FaBars size={20} style={{ color: '#fff', cursor: 'pointer' }} />
          )}
        </div>

        <div className={mobileNav ? style.mobile_open : style.mobile_close}>
          <ul className={style.mobile_list}>

            <li>
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                  handlerMobileNav();
                }}>
                Home
              </Link>
            </li>
            {navLink.map((item: any, i: any) => (
              <li key={i}>
                <Link to={item.link}>{item.tittle}</Link>
              </li>
            ))}
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            {/* <li>
              <Button />
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
