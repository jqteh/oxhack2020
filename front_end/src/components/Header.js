import React from "react";
import LogoText from '../assets/Artboard_2.svg';

function Header() {
  return (
    <header>
      <img src={LogoText} alt='Logo text' className='LogoText'/>
    </header>
  );
}

export default Header;
