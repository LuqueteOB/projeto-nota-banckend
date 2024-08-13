const  m = Date.now();
const segundosAteAqui = Math.floor(m / 1000);
const expiracao = segundosAteAqui + (60 * 60);
console.log(expiracao);
