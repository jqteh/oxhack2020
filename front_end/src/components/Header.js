import React from "react";
import LogoText from '../assets/snap-text-01.png';

function Header() {
  return (
    <header>
      <img src={LogoText} alt='Logo text' className='LogoText'/>
    </header>
  );
}

export default Header;
