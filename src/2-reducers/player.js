const initial = {
  name: '', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  gravatarEmail: '', // email-da-pessoa
};

const player = (state = initial, action) => {
  switch (action.type) {
  case 'NAME':
    return { ...state, name: action.info };
  case 'ASSERTIONS':
    return { ...state, assertions: action.info };
  case 'GRAVATAR_EMAIL':
    return { ...state, gravatarEmail: action.info };
  case 'RESET_STATE':
    return initial;
  case 'ADD_ASSERTION':
    return { ...state, assertions: state.assertions + 1 };
  case 'UPDATE_SCORE':
    return { ...state, score: state.score + action.info };
  default:
    return state;
  }
};

export default player;
