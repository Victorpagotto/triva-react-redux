const AMOUNT = 5;

const getQuestions = async (amount = AMOUNT) => {
  const token = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => res.json())
    .then((res) => {
      if (res.response_code !== 0) {
        return 'Failed the token.';
      }
      return res.token;
    });
  if (token !== 'Failed the token.') {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
    return fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        if (res.response_code !== 0) {
          return 'Failed questions fetch.';
        }
        return res.results;
      });
  }
  return token;
};

export default getQuestions;
