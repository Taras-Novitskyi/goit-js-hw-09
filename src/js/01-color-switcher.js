const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

class Color {
  constructor() {
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      const color = this.getRandomHexColor();
      refs.body.style.backgroundColor = color;
    }, 1000);
  }

  stop() {
	  clearInterval(this.timerId);
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

const changeColor = new Color();

refs.btnStart.addEventListener('click', () => {
	changeColor.start();
	refs.btnStart.setAttribute('disabled', true);
});

refs.btnStop.addEventListener('click', () => {
	changeColor.stop();
	refs.btnStart.removeAttribute('disabled');
});
