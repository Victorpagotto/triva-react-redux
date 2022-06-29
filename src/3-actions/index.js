// Aqui é possível reunir todas as actions em um único objeto para facilitar acesso.
// Importe todas as actions e em seguida as insira no objeto abaixo.

const actions = {
  setName: (name) => ({ type: 'NAME', info: name }),
  setEmail: (gravatarEmail) => ({ type: 'GRAVATAR_EMAIL', info: gravatarEmail }),
};

export default actions;
