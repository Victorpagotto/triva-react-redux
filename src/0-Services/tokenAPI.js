const getToken = async () => {
  const results = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => res.json());
  if (results.response_code !== 0) {
    return 'Failed the token.';
  }
  return results.token;
};

export default getToken;
