const getQuestions = async (token) => {
  const amount = 5;
  if (token !== 'Failed the token.') {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
    const firstResponse = await fetch(endpoint)
      .then((res) => res.json());
    if (firstResponse.response_code !== 0) {
      return 'Failed questions fetch.';
    }
    return firstResponse.results;
  }
  return token;
};

export default getQuestions;
