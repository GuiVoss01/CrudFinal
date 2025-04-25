import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <h1>CRUD de Tênis - Gui Voss</h1>
      <Link className="App-link" to="/">Início</Link>
    </header>
  );
};

export default Header;
