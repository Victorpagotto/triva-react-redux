const getQuestions = async (token) => {
  const amount = 5;
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
