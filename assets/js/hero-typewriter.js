document.addEventListener('DOMContentLoaded', function () {
    var heroTitle = document.getElementById('hero-title');
    if (!heroTitle) {
        return;
    }

    var fullText = heroTitle.getAttribute('data-full-text') || heroTitle.textContent || '';
    heroTitle.textContent = '';

    var cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.style.display = 'inline-block';
    cursor.style.marginLeft = '0.15em';
    cursor.style.animation = 'heroTitleCursorBlink 0.8s steps(1, end) infinite';
    heroTitle.appendChild(cursor);

    var charIndex = 0;
    var typingSpeedMs = 45;

    function typeNextChar() {
        if (charIndex < fullText.length) {
            heroTitle.insertBefore(document.createTextNode(fullText.charAt(charIndex)), cursor);
            charIndex += 1;
            window.setTimeout(typeNextChar, typingSpeedMs);
            return;
        }

        window.setTimeout(function () {
            cursor.remove();
        }, 900);
    }

    typeNextChar();
});
