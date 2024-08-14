
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Slideshow from './Slideshow';
import Veiculo from './Veiculo';

document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById('auto-certo-show-component');
    const slideshow = document.getElementById('auto-certo-slideshow');
    const veiculo = document.getElementById('auto-certo-veiculo');

    if (element) {
        ReactDOM.render(<App />, element);
    }

    if (slideshow) {
        ReactDOM.render(<Slideshow />, slideshow);
    }

    if (veiculo) {
        ReactDOM.render(<Veiculo />, veiculo);
    }
});
