function ConsoleLog(message, style) {
    switch (style) {
      case 'large':
        console.log('%c' + message, 'font-size: 20px; color: #fff;');
        break;
      case 'highlight':
        console.log('%c' + message, 'background-color: yellow; color: black;');
        break;
      default:
        console.log(message);
        break;
    }
  }

  function playAudio() {
    var audio = document.getElementById('myAudio');
    audio.volume = 1;
    audio.play();
    ConsoleLog('View the original source of this audio here: https://www.youtube.com/watch?v=KVqwvU49JLg', 'large'); // original source for the song
  }

  document.addEventListener('DOMContentLoaded', function () {
    const discordLogo = document.querySelector('.social-links img[alt="Discord"]');
    const tooltipText = document.querySelector('.tooltip-text');
    const toast = document.getElementById('toast');

    discordLogo.addEventListener('click', function () {
      const textToCopy = tooltipText.textContent;

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Copied to clipboard successfully!');
          showToast();
        })
        .catch(err => {
          console.error('Unable to copy text. The text did not copy. ', err);
          alert('Unable to copy text. Please try again.');
        });
    });

    function showToast() {
      const toast = document.querySelector('.toast');
      toast.style.display = 'block';

      setTimeout(() => {
        toast.classList.add('fadeOutAnimation');
      }, 2000);

      setTimeout(() => {
        hideToast();
      }, 2500);
    }

    function hideToast() {
      const toast = document.querySelector('.toast');
      toast.classList.remove('fadeOutAnimation');
      toast.style.display = 'none';
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const customCursor = document.querySelector(".custom-cursor");

    document.addEventListener("mousemove", function (e) {
      customCursor.style.top = e.clientY + "px";
      customCursor.style.left = e.clientX + "px";
    });

    document.addEventListener("mouseenter", function () {
      customCursor.style.opacity = "1";
      customCursor.style.transform = "translate(-50%, -50%) scale(1)";
    });

    document.addEventListener("mouseleave", function () {
      customCursor.style.opacity = "0";
      customCursor.style.transform = "translate(-50%, -50%) scale(0)";
    });
  });