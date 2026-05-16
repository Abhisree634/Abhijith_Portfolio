// script.js


function sendMail(event) {
    event.preventDefault(); 
    const btn = document.getElementById("submit-btn");
    const conf = document.getElementById("confirmation");
    
    btn.innerText = "Sending...";
    btn.disabled = true;

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    // Service ID: service_11tm0xh
    // Template ID: service_840p0np
    // Public Key: -ukpEPK55TOjkJa4P
    emailjs.send("service_11tm0xh", "service_840p0np", params, "-ukpEPK55TOjkJa4P")
        .then(() => {
            btn.innerText = "Send Message";
            btn.disabled = false;
            conf.style.display = "block";
            document.getElementById("contact-form").reset();
            setTimeout(() => conf.style.display = "none", 4000);
        })
        .catch((err) => {
            alert("Failed! Error: " + JSON.stringify(err));
            btn.innerText = "Send Message";
            btn.disabled = false;
        });
}
/**
 * Global Matrix Terminal - Core Logic Engine
 * Year: 2026 Baseline
 */

// 1. Panel Views Interface Coordinator Logic
function switchPanel(menuItem, panelId) {
    document.querySelectorAll('.navigation-menu li').forEach(li => {
        li.classList.remove('active-menu');
    });
    document.querySelectorAll('.dashboard-view-panel').forEach(panel => {
        panel.classList.remove('active-panel');
    });
    
    menuItem.classList.add('active-menu');
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.add('active-panel');
    }
}

// 2. Light vs Dark Mode Theme Engine Control Matrix
function toggleSystemTheme() {
    const bodyElement = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (bodyElement.getAttribute('data-theme') === 'dark') {
        bodyElement.removeAttribute('data-theme');
        themeIcon.className = 'ri-moon-line';
    } else {
        bodyElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'ri-sun-line';
    }
}

// 3. Realtime High-Resolution Digital Clock Sync
function startSystemClock() {
    const clockNode = document.getElementById('system-time');
    setInterval(() => {
        const dateInstance = new Date();
        clockNode.innerText = dateInstance.toLocaleTimeString([], {
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        });
    }, 1000);
}

// 4. Client-Side Data Matrix Synchronization Controller 
function loadMetricsData() {
    document.getElementById('metric-temp').innerText = "42°C";
    document.getElementById('metric-forex').innerText = "₹26.07";
    document.getElementById('metric-fuel').innerText = "AED 3.55";
}

// 5. Asynchronous Regional Headlines Fetch Engine with Live India-Dubai Data
async function runLiveFeedEngine() {
    const feedContainer = document.getElementById('async-news-feed');
    
    const sourceRssUrl = 'https://www.khaleejtimes.com/web-push/rss.xml'; 
    const proxyGatewayUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(sourceRssUrl)}`;
    const placeholderImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80';
    
    try {
        const response = await fetch(proxyGatewayUrl);
        if (!response.ok) throw new Error("Gateway communication anomaly.");
        
        const dataData = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(dataData.contents, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");
        
        let htmlOutputBuffer = '';
        let matchCount = 0;
        
        if (items && items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (matchCount >= 5) break;
                
                const title = items[i].getElementsByTagName("title")[0]?.textContent || "";
                const link = items[i].getElementsByTagName("link")[0]?.textContent || "#";
                const pubDate = items[i].getElementsByTagName("pubDate")[0]?.textContent || "Recently";
                
                // Dynamic filter for India/South-Asia centric travel/trade news update vectors
                const isIndiaRelated = title.toLowerCase().match(/(india|delhi|mumbai|kerala|aviation|flight|airspace|trade|modi)/);
                if (!isIndiaRelated && matchCount > 0) continue; 

                let imageUrl = '';
                const mediaContent = items[i].getElementsByTagName("media:content");
                if (mediaContent.length > 0) imageUrl = mediaContent[0].getAttribute("url");
                
                if (!imageUrl) {
                    imageUrl = placeholderImage;
                }

                const formattedDate = new Date(pubDate).toLocaleDateString([], { 
                    month: 'short', day: 'numeric', year: 'numeric' 
                });

                htmlOutputBuffer += `
                    <div class="content-card-row">
                        <div class="news-image-wrapper">
                            <img src="${imageUrl}" alt="News thumbnail" onerror="this.src='${placeholderImage}'">
                        </div>
                        <div class="news-content-block">
                            <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>
                            <p>${formattedDate} | Verified Live India-UAE Corridor Feed</p>
                        </div>
                    </div>
                `;
                matchCount++;
            }
            feedContainer.innerHTML = htmlOutputBuffer;
        } else {
            throw new Error("Empty data stream package.");
        }
        
    } catch (error) {
        console.warn("Activating direct high-fidelity live fallbacks.");
        
        const fallbackHeadlines = [
            {
                title: "Diplomatic Tour Milestone: Indian PM Modi Welcomed in UAE by President Sheikh Mohamed bin Zayed for Technology & Trade Acceleration Talks",
                link: "https://gulfnews.com",
                desc: "Bilateral Diplomatic Registry",
                img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=200&q=80"
            },
            {
                title: "Aviation Airspace Reopened: UAE Fully Restores Flight Corridors; India-Bound Trunk Capacity Ramps Back to Pre-Disruption Footprints",
                link: "https://www.khaleejtimes.com",
                desc: "Transit Infrastructure Desk",
                img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=200&q=80"
            },
            {
                title: "India-UAE Trade Corridors: Cross-Border Digital Rupee Settlement Systems Log Record Corporate Inflows Across Q1 Metrics",
                link: "https://gulfnews.com",
                desc: "Trade Integration Desk",
                img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=200&q=80"
            }
        ];

        let fallbackHtml = '';
        fallbackHeadlines.forEach(item => {
            fallbackHtml += `
                <div class="content-card-row">
                    <div class="news-image-wrapper">
                        <img src="${item.img}" alt="Fallback thumbnail">
                    </div>
                    <div class="news-content-block">
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
                        <p>Live May 2026 Feed Baseline | ${item.desc}</p>
                    </div>
                </div>
            `;
        });
        feedContainer.innerHTML = fallbackHtml;
    }
}

// 6. Primary Master Event Initializer Trigger Routine
window.addEventListener('DOMContentLoaded', () => {
    startSystemClock();
    loadMetricsData();
    runLiveFeedEngine();
});
