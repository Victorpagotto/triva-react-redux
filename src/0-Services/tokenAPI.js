const getToken = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => res.json())
    .then((res) => {
      if (res.response_code !== 0) {
        return 'Failed the token.';
      }
      return res.token;
    })
);

export default getToken;
