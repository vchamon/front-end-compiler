import React, { useState } from 'react';
import { validate } from './Lexer.js'
import './App.scss';

function App() {
  const [compile, setCompile] = useState(true);
  const [empty, setEmpty] = useState(true)

  const success = <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 50 50'>
    <circle style={{ fill: '#25AE88' }} cx='25' cy='25' r='25'/>
    <polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} points='38,15 22,33 12,25 '/>
  </svg>;
  
  const error = <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 50 50'>
    <circle style={{ fill: '#D75A4A' }} cx='25' cy='25' r='25'/>
    <polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: '2', strokeLinecap:'round', strokeMiterlimit: '10' }} points='16,34 25,25 34,16'/>
    <polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: '2', strokeLinecap: 'round', strokeMiterlimit: '10' }} points='16,16 25,25 34,34'/>
  </svg>;

  return (
    <div className='app'>
      <header>
        <div className='pos-f-t'>
          <nav className='navbar app-header'>
            <a href='/'>
              <img src='./app-logo.png' />
            </a>
          </nav>
        </div>
      </header>
      <div className='container'>
        <div className='row mt-5 mb-5'>
          <div className='app-body col-8 offset-2'>
            <h2 className='mb-5'>Analisador Léxico</h2>
            <form>
              <input
                className={empty ? '' : (compile ? 'success' : 'error')}
                type='text'
                placeholder='Digite um trecho de código'
                onChange={
                  event => {
                    if (event.target.value.length === 0) {
                      setEmpty(true);
                    } else {
                      setEmpty(false);
                      setCompile(validate(event.target.value));
                    }
                  }
                } />
                {
                  !empty
                    ? compile
                      ? <button className='status success' disabled>
                        {success}
                      </button>
                      : <button className='status error' disabled>
                        {error}
                      </button>
                    : <button className='status' disabled>
                        <svg />
                      </button>
                }
            </form>
            {
              !empty
                ? compile
                  ? <small className='text-success'>
                    O código compila
                  </small>
                  : <small className='text-error'>
                    O código não compila
                  </small>
                : <div />
            }
          </div>
        </div>
        <div className='row mt-5 mb-5'>
          <div className='app-body col-8 offset-2'>
            <h5 className='mb-4'>Auto Instrucional - Compiladores</h5>
            <li>João Bosco Mesquita</li>
            <li>Lucas Carneiro</li>
            <li>Lucas Tadeu</li>
            <li>Vitor Chamon</li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
