function fetchPresenceData() {
    fetch('https://api.lanyard.rest/v1/users/514106760299151372')
        .then(response => response.json())
        .then(data => {
            console.log('Received presence data:', data);
            if (data?.success) {
                const discordStatus = data?.data?.discord_status;
                let statusText = '';
                switch (discordStatus) {
                    case 'online':
                        statusText = 'Online 💻';
                        break;
                    case 'idle':
                        statusText = 'Idle ⌨️';
                        break;
                    case 'dnd':
                        statusText = 'Do Not Disturb 🛏️';
                        break;
                    default:
                        statusText = 'Offline 🌙';
                        break;
                }
                const dotElement = document.getElementById('dot');
                dotElement.className = `absolute bottom-1 right-1 tooltip tooltip-top tooltip-primary font-bold w-4 h-4 rounded-full ${discordStatus === 'offline' ? 'bg-gray-500' : (discordStatus === 'online' ? 'bg-green-500' : (discordStatus === 'idle' ? 'bg-yellow-500' : 'bg-red-500'))}`;
                dotElement.setAttribute('data-tip', statusText);

                // Update the listeningTo element with the Spotify information
                const listeningToElement = document.getElementById('listeningTo');
                if (data?.data?.listening_to_spotify) {
                    const spotifyData = data.data.spotify;
                    const trackId = spotifyData.track_id;
                    const spotifyTrackUrl = `https://open.spotify.com/track/${trackId}`;
                    listeningToElement.innerHTML = `<a href="${spotifyTrackUrl}" target="_blank"><i class="fa-brands fa-spotify text-green-500 transform-gpu transition-transform hover:rotate-12 duration-250"></i></a> ${spotifyData.song} by ${spotifyData.artist}`;
                } else {
                    listeningToElement.textContent = 'Not listening to Spotify';
                }
            } else {
                console.error('Failed to fetch presence data');
            }
        })
        .catch(error => {
            console.error('Error fetching presence data:', error);
        });
}

// Fetch presence data when the page loads
window.addEventListener('load', fetchPresenceData);

// Fetch presence data every 60 seconds
setInterval(fetchPresenceData, 60000);