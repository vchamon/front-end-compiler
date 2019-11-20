import React, { useState } from 'react';
import { validacao } from './Lexer.js'
import './App.scss';

function App() {
  const [compile, setCompile] = useState(true)
  return (
    <div className='app'>
      <header>
        <div className='pos-f-t'>
          <div className='collapse' id='navbarToggleExternalContent'>
            <div className='bg-dark p-4'>
              <h5 className='text-white h4'>Conteúdo expandido</h5>
              <span className='text-muted'>Expansível, atráves da marca no navbar.</span>
            </div>
          </div>
          <nav className='navbar navbar-dark bg-dark'>
            <button className='navbar-toggler' type='button' data-data='collapse' data-target='#navbarToggleExternalContent' aria-controls='navbarToggleExternalContent' aria-expanded='false' aria-label='Alterna navegação'>
              <span className='navbar-toggler-icon'></span>
            </button>
          </nav>
        </div>
      </header>
      <div className='container'>
        <div className='row mt-5 mb-5'>
          <div className='app-body col-8 offset-2'>
            <form>
              <input
                className={compile ? 'code' : 'code error'}
                type='text'
                placeholder='Digite um trecho de código'
                onChange={
                  event => {
                    if (event.target.value.length === 0) {
                      setCompile(true);
                    } else {
                      setCompile(validacao(event.target.value));
                    }
                  }
                } />
            </form>
            {
              !compile &&
              <small className='text-error'>
                O código não compila
              </small>
            }
          </div>
        </div>
      </div>
      <footer className='app-footer page-footer font-small bg-dark'>
        <div className='footer-copyright text-center py-3'>© 2019 Copyright:
          <a href='https://mdbootstrap.com/education/bootstrap/'> MDBootstrap.com</a>
        </div>
      </footer>
    </div>
  );
}
    
export default App;
