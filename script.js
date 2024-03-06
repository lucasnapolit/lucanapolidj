document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.querySelector('.audio-player');
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    const playlist = document.querySelector('.playlist');
    const playlistItems = document.querySelectorAll('.playlist li');
  
    let currentSongIndex = 0;
  
    // Function to play or pause the song
    function togglePlay() {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = 'Pause';
      } else {
        audioPlayer.pause();
        playBtn.textContent = 'Play';
      }
    }
  
    // Function to play the previous song
    function playPrev() {
      currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
      loadTrack(currentSongIndex);
    }
  
    // Function to play the next song
    function playNext() {
      currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
      loadTrack(currentSongIndex);
    }
  
    // Function to load a song
    function loadTrack(index) {
      const songTitle = playlistItems[index].textContent;
      const songSrc = `song${index + 1}.mp3`; // Change this to match your song filenames
      audioPlayer.src = songSrc;
      trackTitle.textContent = songTitle;
      trackArtist.textContent = 'Artist Name'; // Set artist name here
      audioPlayer.play();
      playBtn.textContent = 'Pause';
    }
  
    // Function to update the progress bar
    function updateProgress() {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.value = progress;
    }
  
    // Function to set the progress bar
    function setProgress(e) {
      const progress = e.target.value;
      audioPlayer.currentTime = (progress / 100) * audioPlayer.duration;
    }
  
    // Add event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrev);
    nextBtn.addEventListener('click', playNext);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('change', setProgress);
  
    // Load the first song when the page loads
    loadTrack(currentSongIndex);
  
    // Add event listener to playlist items
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentSongIndex = index;
        loadTrack(currentSongIndex);
      });
    });
  });