import React from 'react';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <div className={style.footer}>
      <p>
        &copy;2023 Dreyar /{' '}
        <a href="#" target="_blank">
          Suport the Developer.
        </a>
      </p>
    </div>
  );
};

export default Footer;
