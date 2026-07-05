const webview = document.getElementById('view');
const urlInput = document.getElementById('urlInput');
const goBtn = document.getElementById('goBtn');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const reloadBtn = document.getElementById('reloadBtn');
const homeBtn = document.getElementById('homeBtn');

const homepage = document.getElementById('customHomepage');
const homeSearchInput = document.getElementById('homeSearchInput');
const homeSearchBtn = document.getElementById('homeSearchBtn');

// Navigation Core Core Logic
function navigateTo(url) {
    if (!url) return;
    
    // Clean string format logic
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
            targetUrl = 'https://' + targetUrl;
        } else {
            // Safe fallback web search integration
            targetUrl = 'https://duckduckgo.com' + encodeURIComponent(targetUrl);
        }
    }

    // Toggle container views visibility
    homepage.classList.add('hidden');
    webview.classList.add('active');
    
    webview.src = targetUrl;
    urlInput.value = targetUrl;
}

function showHomepage() {
    webview.classList.remove('active');
    homepage.classList.remove('hidden');
    urlInput.value = '';
    homeSearchInput.value = '';
}

// Action Listeners
goBtn.addEventListener('click', () => navigateTo(urlInput.value));
urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') navigateTo(urlInput.value); });

homeSearchBtn.addEventListener('click', () => navigateTo(homeSearchInput.value));
homeSearchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') navigateTo(homeSearchInput.value); });

homeBtn.addEventListener('click', showHomepage);
backBtn.addEventListener('click', () => { if (webview.canGoBack()) webview.goBack(); });
forwardBtn.addEventListener('click', () => { if (webview.canGoForward()) webview.goForward(); });
reloadBtn.addEventListener('click', () => webview.reload());

// Sync current URL changes to address input bar
webview.addEventListener('did-navigate', (e) => { urlInput.value = e.url; });
webview.addEventListener('did-navigate-in-page', (e) => { urlInput.value = e.url; });

// Bind shortcut quick cards
document.querySelectorAll('.shortcut-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(card.getAttribute('data-url'));
    });
});
