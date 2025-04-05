let player;
let isYouTubeAPIReady = false;

const form = document.getElementById('url-form');
const urlInput = document.querySelector('.url-input');

const getVideoIdFromUrl = (url) => {
  const isValidUrl = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return isValidUrl ? isValidUrl[1] : null;
};

const onPlayerReady = (e) => {
  e.target.playVideo();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!isYouTubeAPIReady) {
    alert('YouTube API not ready yet!');

    return;
  }

  const videoId = getVideoIdFromUrl(urlInput.value);

  if (!videoId) {
    alert('Invalid YouTube URL');

    return;
  }

  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('player', {
      height: 390,
      width: 640,
      videoId,
      playerVars: {
        loop: 1,
        playlist: videoId,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }
});

/* Arrow function can't be used here without binding the function to the window object as YouTube IFrame API looks for a function declaration in it. Hence the code style inconsistency */

function onYouTubeIframeAPIReady() {
  isYouTubeAPIReady = true;
}
