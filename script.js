const spotifyLink = document.getElementById('spotify-link');

// Add event listener to redirect the user to Spotify when clicked
spotifyLink.addEventListener('click', function(event) {
    // You can add additional checks or actions here if needed
    // Example: Check if the search input is empty before redirecting
    const searchInput = document.getElementById('search-input');
    if (!searchInput.value) {
        alert('Please enter a search query before proceeding!');
        event.preventDefault(); // Prevent the link from being activated if search input is empty
    }
});

// script.js

function filterSongs(artist) {
    // Get all song elements
    const songs = document.querySelectorAll('.songlink');
    
    // Loop through each song
    songs.forEach(song => {
        // Check if the song's artist matches the selected artist
        if (song.getAttribute('data-artist') === artist || artist === 'all') {
            song.style.display = 'flex'; // Show song if it matches
        } else {
            song.style.display = 'none'; // Hide song if it doesn't match
        }
    });
}

/*document.getElementById('search-input').addEventListener('input', function() {
    let searchQuery = this.value.toLowerCase();
    let songLinks = document.querySelectorAll('.songlink');

    songLinks.forEach(function(song) {
        let songTitle = song.getAttribute('data-title').toLowerCase();
        let songArtist = song.getAttribute('data-artist').toLowerCase();
        
        if (songTitle.includes(searchQuery) || songArtist.includes(searchQuery)) {
            song.style.display = 'flex';
        } else {
            song.style.display = 'none';
        }
    });
});*/

// Get the search input element
document.getElementById('search-input').addEventListener('input', function() {
    let searchQuery = this.value.toLowerCase(); // Get the search query and convert to lowercase
    let songLinks = document.querySelectorAll('.songlink'); // Select all songlink divs

    songLinks.forEach(function(song) {
        let songTitle = song.getAttribute('data-title').toLowerCase(); // Get title from data-title attribute
        let songArtist = song.getAttribute('data-artist').toLowerCase(); // Get artist from data-artist attribute

        // If either the title or artist includes the search query, show the song
        if (songTitle.includes(searchQuery) || songArtist.includes(searchQuery)) {
            song.style.display = 'flex'; // Show song
        } else {
            song.style.display = 'none'; // Hide song
        }
    });
});

  const micButton = document.getElementById('voice-button');
        const searchInput = document.getElementById('search-input');
        const searchResultsDiv = document.getElementById('search-results');

        // Start voice recognition when mic button is clicked
        micButton.addEventListener('click', function() {
            if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
                alert("Sorry, your browser does not support speech recognition.");
                return;
            }
            
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                console.log('Voice input:', transcript); // Debugging line
                searchInput.value = transcript; // Set the input field value to the voice input
                filterResults(); // Filter results after the voice input is detected
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
            };
        });

        // Function to filter songs based on the input
        function filterResults() {
            const query = searchInput.value.toLowerCase();
            const results = songs.filter(song => song.name.toLowerCase().includes(query));
            displayResults(results);
        }

        // Function to display search results dynamically
        function displayResults(results) {
            if (results.length > 0) {
                searchResultsDiv.innerHTML = results.map(song => `<div>${song.name} by ${song.artist}</div>`).join('');
            } else {
                searchResultsDiv.innerHTML = 'No songs found.';
            }
        }