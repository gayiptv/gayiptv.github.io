async function loadStreams() {
    try {
        const response = await fetch('streams.json');
        if (!response.ok) throw new Error('Błąd podczas ładowania streams.json');
        const streamsData = await response.json();

        const channelList = document.getElementById('polska-channels');
        const channels = Object.keys(streamsData).sort();

        channels.forEach(channel => {
            const channelItem = document.createElement('div');
            channelItem.className = 'channel-item';
            channelItem.textContent = channel;

            if (streamsData[channel].length > 0) {
                streamsData[channel].forEach(stream => {
                    const streamButton = document.createElement('button');
                    streamButton.className = 'stream-button';
                    streamButton.innerHTML = `<img src="stream-icon.png" alt="Stream Icon"> Streamy`;
                    streamButton.onclick = () => window.open(stream, '_blank');
                    channelItem.appendChild(streamButton);
                });
            }
            channelList.appendChild(channelItem);
        });
    } catch (error) {
        console.error('Wystąpił błąd:', error.message);
    }
}
