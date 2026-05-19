document.addEventListener('DOMContentLoaded', function () {
    var playerElement = document.querySelector('.js-chocolate-player');

    if (!playerElement || typeof Plyr === 'undefined') {
        return;
    }

    new Plyr(playerElement, {
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen'
        ],
        tooltips: { controls: true, seek: true },
        settings: ['speed', 'quality'],
        speed: {
            selected: 1,
            options: [0.75, 1, 1.25, 1.5]
        }
    });
});
