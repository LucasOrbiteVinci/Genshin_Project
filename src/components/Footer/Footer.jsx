import React from 'react';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <div className={style.footer}>
      <p>
        &copy;2023 CalculAbyss /{' '}
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=7NW5T4MYGQYLN"
          target="_blank"
        >
          Support the Project.
        </a>
      </p>
    </div>
  );
};

export default Footer;
