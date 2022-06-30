/*
States necessários:
    timer: 30
    timeOut: false
    paused: false
Elemento necessário na classe:
    Counter
*/

function createCounter(target) {
  const INTERVAL = 1000;
  target.setState({ timeOut: false }, () => {
    target.counter = setInterval(() => {
      const { timer } = target.state;
      if (timer < 1) {
        clearInterval(this.counter);
        target.setState({ timer: 30, timeOut: true });
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
  target.setState({ timer: 30, paused: false }, () => {
    createCounter(target);
  });
}

function pauseControl(target, paused) {
  target.setState((prevState) => ({
    paused: !prevState.paused,
  }), () => {
    if (!paused) {
      clearInterval(target.counter);
    } else {
      createCounter(target);
    }
  });
}

const counterKit = {
  createCounter,
  startControl,
  pauseControl,
};

export default counterKit;
