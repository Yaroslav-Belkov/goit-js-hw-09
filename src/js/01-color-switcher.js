function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const getStartButton = document.querySelector('button[data-start]')
  const getStopButton = document.querySelector('button[data-stop]')
  let bgColor = '';
  
  getStartButton.addEventListener('click', onStartButtonClick);
  getStopButton.addEventListener('click', onStopButtonClick);
  
  function onStartButtonClick() {
      bgColor = setInterval(() => {
          document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      getStartButton.setAttribute('disabled', 'disabled');
  }
  
  function onStopButtonClick() {
      clearInterval(bgColor);
      getStartButton.removeAttribute('disabled');
  }
