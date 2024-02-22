function fetchSpotifyData() {
    fetch('https://api.lanyard.rest/v1/users/514106760299151372')
        .then(response => response.json())
        .then(data => {
            if (data?.success && data?.data?.listening_to_spotify) {
                const spotifyData = data.data.spotify;
                document.getElementById('albumArt').src = spotifyData.album_art_url;
                document.getElementById('songTitle').textContent = spotifyData.song;

                const artistAlbumElement = document.getElementById('artistAlbum');

                const artistSpan = document.createElement('span');
                artistSpan.textContent = spotifyData.artist;
                artistSpan.classList.add('font-bold');

                const albumSpan = document.createElement('span');
                albumSpan.textContent = spotifyData.album;
                albumSpan.classList.add('font-bold');

                artistAlbumElement.innerHTML = '';
                artistAlbumElement.appendChild(document.createTextNode('by '));
                artistAlbumElement.appendChild(artistSpan);
                artistAlbumElement.appendChild(document.createTextNode(' on '));
                artistAlbumElement.appendChild(albumSpan);

                document.getElementById('viewOnSpotify').addEventListener('click', function() {
                    const trackId = spotifyData.track_id;
                    const spotifyTrackUrl = `https://open.spotify.com/track/${trackId}`;
                    window.open(spotifyTrackUrl, '_blank');
                });
            } else {
                document.getElementById('albumArt').src = '../assets/notplaying.svg';
                document.getElementById('songTitle').textContent = 'Nothing playing right now...';
                document.getElementById('artistAlbum').textContent = 'Check back later!';
                document.getElementById('viewOnSpotify').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching Spotify data:', error);
        });
}

window.addEventListener('load', fetchSpotifyData);
setInterval(fetchSpotifyData, 1000);