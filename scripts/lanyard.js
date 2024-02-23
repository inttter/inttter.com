function fetchPresenceData() {
    fetch('https://api.lanyard.rest/v1/users/514106760299151372')
        .then(response => response.json())
        .then(data => {
            console.log("lanyard", data);
            if (data.success) {
                const activities = data.data.activities;
                let statusElement = document.getElementById('status');
                let gameActivity = null;
                let spotifyActivity = null;
                let discordStatus = data.data.discord_status;
                let platform = '';

                // Determine platform
                if (data.data.active_on_discord_desktop) {
                    platform = 'Desktop';
                } else if (data.data.active_on_discord_mobile) {
                    platform = 'Mobile';
                } else if (data.data.active_on_discord_web) {
                    platform = 'Web';
                }

                // Set status text based on Discord status
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

                // Update dot element
                const dotElement = document.getElementById('dot');
                dotElement.className = `absolute bottom-0 right-0.5 transform translate-x-1/2 w-4 h-4 rounded-full tooltip tooltip-top ${discordStatus === 'offline' ? 'bg-gray-400' : (discordStatus === 'online' ? 'bg-emerald-500' : (discordStatus === 'idle' ? 'bg-amber-400' : 'bg-rose-400'))}`;
                dotElement.setAttribute('data-tip', statusText);

                // Prioritize game activity over Spotify activity
                for (let activity of activities) {
                    if (activity.type === 0) {
                        gameActivity = activity;
                        break; // Exit loop if game activity found
                    } else if (activity.name === 'Spotify') {
                        spotifyActivity = activity;
                    }
                }

                if (gameActivity) {
                    statusElement.textContent = `Playing ${gameActivity.name}`;
                } else if (spotifyActivity) {
                    statusElement.textContent = `Listening to ${spotifyActivity.details} by ${spotifyActivity.state}`;
                } else {
                    statusElement.textContent = statusText;
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
setInterval(fetchPresenceData, 10000);