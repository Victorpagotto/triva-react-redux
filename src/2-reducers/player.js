const initial = {
  name: '', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  gravatarEmail: 11, // email-da-pessoa
};

const player = (state = initial, action) => {
  switch (action.type) {
  case 'NAME':
    return { ...state, name: action.info };
  case 'ASSERTIONS':
    return { ...state, assertions: action.info };
  case 'SCORE':
    return { ...state, score: action.info };
  case 'GRAVATAR_EMAIL':
    return { ...state, gravatarEmail: action.info };
  default:
    break;
  }
};

export default player;
