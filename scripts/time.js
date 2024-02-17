function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = formatTime(hours, minutes);

    currentTimeElement.textContent = formattedTime;
}

function formatTime(hours, minutes) {
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

setInterval(updateCurrentTime, 1000);