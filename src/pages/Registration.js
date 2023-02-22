import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import FrontLogo from '../components/LogoAndTitle/FrontLogo';

import '../pages/pages.css';

function Registration() {
  return (
    <>
      <Header className='page-header'></Header>
      <FrontLogo></FrontLogo>
    </>
  );
}

export default Registration;
