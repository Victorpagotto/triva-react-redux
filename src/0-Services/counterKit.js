/*
Abaixo o necessário:
States necessários:
    timer: 30
    timeOut: false
    paused: false
Elemento necessário na classe:
    Counter
*/

const TIMEAMOUNT = 30;

function createCounter(target) {
  const INTERVAL = 1000;
  target.setState({ timeOut: false }, () => {
    target.counter = setInterval(() => {
      const { timer } = target.state;
      if (timer < 1) {
        clearInterval(target.counter);
        target.setState({ timer: TIMEAMOUNT, timeOut: true });
      } else {
        target.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, INTERVAL);
  });
}

function startControl(target) {
  clearInterval(target.counter);
  target.setState({ timer: TIMEAMOUNT, paused: false }, () => {
    createCounter(target);
  });
}

function pauseControl(target) {
  clearInterval(target.counter);
}

const counterKit = {
  createCounter,
  startControl,
  pauseControl,
};

export default counterKit;
