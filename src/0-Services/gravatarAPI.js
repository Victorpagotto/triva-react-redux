// Função para manejar a hash do gravatar
import CryptoJS from 'crypto-js';

function toHash(email) {
  const trimmedEmail = email.trim();
  const toLowerEmail = trimmedEmail.toLowerCase();
  return CryptoJS.MD5(toLowerEmail).toString();
}

function getImage(email) {
  return `https://www.gravatar.com/avatar/${toHash(email)}`;
}

function getProfile(email) {
  return `https://www.gravatar.com/${toHash(email)}`;
}

const gravatar = {
  toHash,
  getImage,
  getProfile,
};

export default gravatar;
