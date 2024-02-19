function fetchPresenceData() {
    fetch('https://api.lanyard.rest/v1/users/514106760299151372')
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                const discordStatus = data?.data?.discord_status;
                let platform = '';
                if (data?.data?.active_on_discord_desktop) {
                    platform = 'Desktop';
                } else if (data?.data?.active_on_discord_mobile) {
                    platform = 'Mobile';
                } else if (data?.data?.active_on_discord_web) {
                    platform = 'Web';
                }
                let statusText = '';
                switch (discordStatus) {
                    case 'online':
                        statusText = `Online ${platform ? `on ${platform}` : ''}`;
                        break;
                    case 'idle':
                        statusText = `Idle ${platform ? `on ${platform}` : ''}`;
                        break;
                    case 'dnd':
                        statusText = `Do Not Disturb ${platform ? `on ${platform}` : ''}`;
                        break;
                    default:
                        statusText = 'Offline';
                        break;
                }
                
                if (data?.data?.activities && data.data.activities.length > 0) {
                    let spotifyPlaying = false;
                    data.data.activities.forEach(activity => {
                        if (activity.name === "Spotify" && data.data.listening_to_spotify) {
                            spotifyPlaying = true;
                        }
                    });
                    const nonSpotifyActivity = data.data.activities.find(activity => activity.name !== "Spotify");
                
                    if (nonSpotifyActivity?.name && nonSpotifyActivity?.details) {
                        const activityTextElement = document.getElementById('activityText');
                        activityTextElement.textContent = `Playing ${nonSpotifyActivity.name}`;
                    } else if (spotifyPlaying) {
                        const activityTextElement = document.getElementById('activityText');
                        activityTextElement.textContent = '';
                    }
                }

                const dotElement = document.getElementById('dot');
                dotElement.className = `absolute bottom-1 right-1 tooltip tooltip-top tooltip-primary font-bold w-4 h-4 rounded-full ${discordStatus === 'offline' ? 'bg-gray-500' : (discordStatus === 'online' ? 'bg-green-500' : (discordStatus === 'idle' ? 'bg-yellow-500' : 'bg-red-500'))}`;
                dotElement.setAttribute('data-tip', statusText);

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

window.addEventListener('load', fetchPresenceData);

setInterval(fetchPresenceData, 60000);