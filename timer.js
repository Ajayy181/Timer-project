function loadPage() {
  const startButton = document.querySelector('.js-start-button');
  const pauseButton = document.querySelector('.js-pause-button');
  const resetButton = document.querySelector('.js-reset-button');
  const inputElement = document.querySelector('.js-timer-input');
  const timerCountdown = document.querySelector('.js-timer-countdown');
  timerCountdown.innerHTML = '0:00'


  startButton.addEventListener('click', () => {
    startTimer();
  });

  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      startTimer();
    }
  });

  pauseButton.addEventListener('click', () => {
    if (pauseButton.innerHTML === 'resume') {
      resumeTimer();
      pauseButton.innerHTML = 'pause';
    }
    else if (pauseButton.innerHTML === 'pause') {
      if (!intervalId) {
        return;
      }
      pauseTimer();
      pauseButton.innerHTML = 'resume';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
      if (pauseButton.innerHTML === 'resume') {
      resumeTimer();
      pauseButton.innerHTML = 'pause';
      }
      else if (pauseButton.innerHTML === 'pause') {
        if (!intervalId) {
          return;
        }
        pauseTimer();
        pauseButton.innerHTML = 'resume';
      }
    }
  });

  resetButton.addEventListener('click', () => {
    resetTimer();
  });


  let intervalId;
  let totalTimeLocked;
  let offset = 0;

  function startTimer() {
    const inputElement = document.querySelector('.js-timer-input');
    const timerCountdown = document.querySelector('.js-timer-countdown');
    const startButton = document.querySelector('.js-start-button');
    const pauseButton = document.querySelector('.js-pause-button');
    let time = Number(inputElement.value);
    totalTimeLocked = Number(inputElement.value);
    const progressBar = document.querySelector('.js-progress-bar-ring');
    progressBar.style.strokeDashoffset = 0;
    
    

    if (inputElement.value === '') {
      alert('Input in seconds below!');
      return;
    }

    if (time <= 0) {
      alert('invalid countdown number');
      return;
    }

    if (pauseButton.innerHTML === 'resume') {
      pauseButton.innerHTML = 'pause';
    }

    startButton.innerHTML = 'restart';
    timerCountdown.classList.remove('timer-ending');
    timerCountdown.classList.remove('timer-ended');
    progressBar.classList.remove('timer-ending');
    progressBar.classList.remove('timer-ended');

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerCountdown.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    clearInterval(intervalId);
    intervalId = setInterval(() => {
      time--;
      percentageProgressBar(time);

      if (time < 10) {
        timerCountdown.classList.add('timer-ending');
        progressBar.classList.add('timer-ending');
      }
      

      if (time === 0) {
        clearInterval(intervalId);
        timerCountdown.innerHTML = '0:00';
        localStorage.removeItem('remainingTime');
        timerCountdown.classList.remove('timer-ending');
        timerCountdown.classList.add('timer-ended');
        startButton.innerHTML = 'start';
   
        intervalId = null;
        setTimeout(() => alert('TIME UP!!!'), 1000);
        return;
      }

      minutes = Math.floor(time / 60);
      seconds = time % 60;
      timerCountdown.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      localStorage.setItem('remainingTime', time);
    }, 1000);
  }

  function pauseTimer() {
    const progressBar = document.querySelector('.js-progress-bar-ring');
    progressBar.style.strokeDashoffset = offset;
    progressBar.classList.add('progress-bar-ring-pause');
    clearInterval(intervalId);
    let time = Number(localStorage.getItem('remainingTime'));
    

    if (time < 10) {
      timerCountdown.classList.remove('timer-ending');
      timerCountdown.classList.add('timer-ended');
      progressBar.classList.remove('timer-ending');
      progressBar.classList.add('timer-ended');
    }
  }

  function resumeTimer() {
    const inputElement = document.querySelector('.js-timer-input');
    const timerCountdown = document.querySelector('.js-timer-countdown');
    const startButton = document.querySelector('.js-start-button');
    const progressBar = document.querySelector('.js-progress-bar-ring');

    if (inputElement.value === '') {
      return;
    }

    progressBar.classList.remove('progress-bar-ring-pause')
    let time = Number(localStorage.getItem('remainingTime'));
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerCountdown.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    clearInterval(intervalId);
    intervalId = setInterval(() => {
      time--;
      percentageProgressBar(time);

      if (time < 10) {
        timerCountdown.classList.add('timer-ending');
        progressBar.classList.add('timer-ending');
      }

      if (!time || time === 0) {
        clearInterval(intervalId);
        timerCountdown.innerHTML = '0:00';
        startButton.innerHTML = 'start';
        localStorage.removeItem('remainingTime');
        timerCountdown.classList.remove('timer-ending');
        timerCountdown.classList.add('timer-ended');
        intervalId = null;
        setTimeout(() => alert('TIME UP!!!'), 1000);
        return;
      }

      minutes = Math.floor(time / 60);
      seconds = time % 60;
      timerCountdown.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      localStorage.setItem('remainingTime', time);
    }, 1000);
  }

  function resetTimer() {
    const inputElement = document.querySelector('.js-timer-input');
    const timerCountdown = document.querySelector('.js-timer-countdown');
    const startButton = document.querySelector('.js-start-button');
    const pauseButton = document.querySelector('.js-pause-button');
    const progressBar = document.querySelector('.js-progress-bar-ring');

    clearInterval(intervalId);
    timerCountdown.innerHTML = '0:00';
    localStorage.removeItem('remainingTime');
    startButton.innerHTML = 'start';
    pauseButton.innerHTML = 'pause';
    inputElement.value = '';
    intervalId = null;
    timerCountdown.classList.remove('timer-ending');
    timerCountdown.classList.remove('timer-ended');
    progressBar.classList.remove('timer-ending');
    progressBar.classList.remove('timer-ended');
    progressBar.style.strokeDashoffset = 0;
  }

  function percentageProgressBar(time) {
    const totalTime = totalTimeLocked;
    const progressBar = document.querySelector('.js-progress-bar-ring');
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    progressBar.style.strokeDasharray = circumference;
    const progress = time / totalTime;
    offset = -circumference * (1 - progress);
    progressBar.style.strokeDashoffset = offset;
  }
}
loadPage();