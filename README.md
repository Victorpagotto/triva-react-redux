<h1 align="center">Trivia em React</h1>

<h2 align="center">Português</h2>


**Nome**: Trivia em React

**Conhecimentos Usados**: React, CSS, HTML, Javascript, Jest, Redux e RTL.

**Ferramentas usadas**: ESLint, Google Fonts, Trivia API e Gravatar API.

**Número de Pessoas**: 4.

-----------------------

<h3 align="center">Descrição</h3>

<p align="justify">Este projeto é desenvolvido com o intuito de se criar uma página com um sistema de perguntas e respostas baseado no jogo Trivia utilizando o framework React com a biblioteca Redux. O projeto foi realizado em um grupo de 4 pessoas ao longo de 5 dias. O grupo foi dividido em duas duplas, com cada uma sendo responsável por uma página por vez ao longo da criação, e, como dois alunos estavam relativamente atrasados no conteúdo, essas duplas foram dividas de maneira a colocar aqueles em dia para ajudar aqueles que não estavam.</p>
<p align="justify">Criado inteiro utilizando React, o intuito do projeto era praticar o uso da biblioteca Redux. Ela seria usada para o armazenamento de informações do usuário e, principalmente, das perguntas e respostas referentes ao jogo. O usuário consegue jogar o jogo, acumular os pontos de acordo com suas respostas, e então comparar posteriormente com pontuações anteriores, bem como outros perfis que potencialmente poderiam ter jogado no mesmo navegador, obtido através do uso de local storage. </p>
<p align="justify">Para obter as perguntas e respostas, uma API foi utilizada. Utilizando-se de dois endpoints, primeiro um token é gerado para criar uma sequência de perguntas, e depois as perguntas em si são carregadas à página assim que o login é realizado, as colocando dentro do estado global do Redux. Após isso, as informações são distribuídas a cada página, havendo tanto informações de usuário quanto do jogo em si. Toda essa distribuição utiliza-se do potencial de acessar o estado global da biblioteca Redux , portanto as informações do usuário intercalam-se dentre o local storage e o Redux de acordo com tal login.</p>
<p align="justify">Um dos objetivos deste projeto também era a utilização do método Agile com o uso conjunto de Kanban para coordenar o trabalho em grupo. As duplas realizavam reuniões entre si sempre que atingiam um objetivo, e os membros internos de cada dupla seguiam um planejamento interno conforme a designação de tarefas, dividindo a funções em diferentes partes da mesma página para evitar o máximo possível os conflitos de código, tornando o desenvolvimento mais ágil.</p>
<p align="justify">Eu e minha dupla fomos responsáveis pelas páginas de login, ranking, feedback e metade da página de jogo, a qual demonstrou ser a mais trabalhosa e complexa dentre estas. O projeto fora planejado para também ser inserida uma página de settings, entretanto, devido a problemas pessoais que acometeram a alguns do grupo, não fora possível o fazer a tempo.</p>
<p align="justify"> Eu fora responsável a ajudar a minha dupla a acompanhar o conteúdo, e mais tarde também ajudaria a outra dupla com problemas mais complexos que não estavam sendo resolvidos a tempo. Devido a tais problemas pessoas citados, eu tive que também realizar o término e refatoração da página do jogo mais tarde, bem como fui o responsável por criar o CSS, os códigos de service (API Trivia, Gravatar e temporizador) e os testes da página antes. Os testes seriam levemente refatorados por um de meus companheiros posteriormente para melhor organização de pastas e adição de constantes.</p>

-----------------------

<h3 align="center">Projeto Trybe</h3>

  <p align="justify">Um projeto Trybe é um projeto o qual eu tenha feito durante minha estadia como aluno da Trybe. Este é um curso 100% online focado em desenvolvimento web, mas que tange partes de outras áreas, tentando prover mais ferramentas.</p>
  <p align="justify">Tais projetos são feitos ao fim de blocos ao longo do curso, com o objetivo de solidificar o conhecimento nele adquirido. Estes projetos são feitos a partir de requisitos os quais devem ser atendidos, os quais buscam imitar requisições feitas para o profissional no mercado de trabalho. Esses requisitos precisam ser implementados, e isso é testado através de testes automáticos fornecidos pela própria Trybe ao longo do desenvolvimento.</p>
  <p align="justify">Entretanto, apesar de estes fornecerem uma estrutura básica para o desenvolvimento e teste do que eles requerem, o código relativo à funcionalidade deste projeto foi desenvolvido por alunos.</p>

-----------------------

<h3 align="center">Como Instalar</h3>
<p align="justify">Para o funcionamento correto do projeto, é necessário ter instalado o Node.js e Git. Após isso, apenas clone o repositório e realize o comando "npm install" dentro da pasta do projeto. Para iniciar o projeto, tenha a porta 3000 liberada no localhost de seu computador e então execute o comando "npm start", também dentro da pasta, para que a página se abra em seu navegador. </p>

-----------------------

<h2 align="center">English</h2>


**Name**: Trivia in React

**Used Knowledges**: React, CSS, HTML, Javascript, Jest, Redux and RTL.

**Used Tools**: ESLint, Google Fonts, Trivia API and Gravatar API.

**Number of People**: 4.

-----------------------

<h3 align="center">Description</h3>

<p align="justify">This project was developed in order to create a page with a questions and answers system based on the Trivia game using the React framework together with Redux library. The project was made by a group of 4 people and was 5 days long. The group was divided into pairs, with each one being responsible for one page at a time, and, as two students were relatively behind on the knowledge topics, these pairs were divided in a way of helping them to catch up.</p>
<p align="justify">Created entirely using React, the purpose of the project was to practice with the Redux library. It would be used to store user information and, mainly, questions and answers regarding the game itself. The user can play it, accumulate points according to their answers, and then compare them later with previous scores, as well as other profiles that could potentially also have played in the same browser, achieved by using the local storage.</p>
<p align="justify">For getting the questions and answers, an API was used. By access to two endpoints, first a token is generated to create a sequence of questions, and then the questions themselves are loaded onto the page as soon as the login is made, inserting them into the global Redux state. After that, the information is distributed to each page as needed, both with user and game data. This entire distribution takes advantage of the potential to access the global state of the Redux library, so user data is moved between the local storage and Redux according to the login info.</p>
<p align="justify">One of this project's goals was also to use the Agile method altogether with use of Kanban to coordinate the group. The pairs held meetings with each other whenever they reached a milestone, and the members of each pair followed an internal plan according to the assignment of tasks, dividing the work between different parts of the same page to avoid code conflicts as much as possible, resulting in a more agile development.</p>
<p align="justify">My partner and I were responsible for the login, ranking and the feedback pages, and also half of the game page, which proved to be the most laborious and complex of these. The project was planned to also include a settings page, however, due to personal problems that affected some members of the group, it was not possible to make it in time.</p>
<p align="justify">I was responsible for helping my pair in keeping up with the necessary knowledge, and later I would also help the other pair with more complex issues that weren't getting solved in time. Due to problems, I also had to finish and refactor the game's page later on, as well as being responsible for creating the CSS, the service codes (Trivia API, Gravatar and timer) and the page tests earlier. The tests would be slightly refactored by one of my group mates later for better organization of folders and the addition of constants.</p>

-----------------------

<h3 align="center">Trybe Project</h3>

  <p align="justify">A Trybe project is a project which was done during my time as a Trybe student. This is a 100% online course focused on web development, but it touches parts of other areas, trying to provide more tools.</p>
  <p align="justify">Such projects happen at the end of blocks throughout the course, with the aim of solidifying the knowledge acquired along  it. These projects are made from requirements that must be met, which seek to imitate those made to the professionals in the work environment. These requirements need to be implemented, and this is tested through automatic tests provided by Trybe.</p>
  <p align="justify">However, although these provide a basic framework for developing and testing for what they require, the code related to the functionality of these project are developed by students.</p>

-----------------------

<h3 align="center">How to Install</h3>
<p align="justify">For the project to properly work, it's necessary to have installed Node.js and Git. After that, just clone the repository and run the command "npm install" within the project's folder. To start the project, have port 3000 open on your computer's localhost, then run the command "npm start", also within the project's folder, for the page to be open in your browser.</p>

-----------------------
