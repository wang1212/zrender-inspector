import * as myLib from '../build/bundle.esm.js';
console.log(myLib);

window['lib'].innerHTML = myLib.VERSION;
