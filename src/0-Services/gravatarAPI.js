// Função para manejar a hash do gravatar
import { MD5 } from 'crypto-js';

function toHash(email) {
  const trimmedEmail = email.trim();
  const toLowerEmail = trimmedEmail.toLowerCase();
  return MD5(toLowerEmail).toString();
}

function getImage(email) {
  return `https://www.gravatar.com/avatar/${toHash(email)}`;
}

const gravatar = {
  toHash,
  getImage,
};

export default gravatar;
