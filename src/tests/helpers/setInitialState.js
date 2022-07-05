export default function setInitialState(assert, score) {
    return {
        player: {
            name: 'TestName', // nome-da-pessoa
            assertions: assert, // número-de-acertos
            score: score, // pontuação
            gravatarEmail: 'test.test@gmail.com', // email-da-pessoa
        }
    }
};