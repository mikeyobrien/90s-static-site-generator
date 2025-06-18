// ABOUTME: Classic 90s JavaScript effects and enhancements
// ABOUTME: Status bar scrolling, random pages, and more!

// Status bar scrolling message
var statusMsg = "Welcome to " + (window.siteName || "my homepage") + "!!! ";
var statusPos = 0;

function scrollStatus() {
  window.status = statusMsg.substring(statusPos) + statusMsg.substring(0, statusPos);
  statusPos++;
  if (statusPos > statusMsg.length) statusPos = 0;
  setTimeout("scrollStatus()", 100);
}

// Random page navigation
function randomPage() {
  // Get all available pages from navigation data
  var pages = [];
  
  // Add main pages
  if (window.navigationPages) {
    for (var i = 0; i < window.navigationPages.length; i++) {
      pages.push(window.navigationPages[i].url);
    }
  }
  
  // Add recent posts
  if (window.navigationPosts) {
    for (var j = 0; j < window.navigationPosts.length; j++) {
      pages.push(window.navigationPosts[j].url);
    }
  }
  
  // Add home and sitemap
  pages.push('/');
  pages.push('/sitemap.html');
  
  if (pages.length > 0) {
    var randomIndex = Math.floor(Math.random() * pages.length);
    window.location.href = pages[randomIndex];
  } else {
    alert("No pages found! This site is still under construction!");
  }
}

// Right-click message
function noRightClick(e) {
  if (window.event) {
    if (window.event.button == 2 || window.event.button == 3) {
      alert("Right-click is disabled! This content is copyrighted © 1997");
      return false;
    }
  } else if (e.button == 2 || e.button == 3) {
    alert("Right-click is disabled! This content is copyrighted © 1997");
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

// Image rollover effects
function imgOn(imgName, imgSrc) {
  if (document.images) {
    document.images[imgName].src = imgSrc;
  }
}

function imgOff(imgName, imgSrc) {
  if (document.images) {
    document.images[imgName].src = imgSrc;
  }
}

// Browser detection and warnings
function checkBrowser() {
  var browserName = navigator.appName;
  var browserVersion = parseFloat(navigator.appVersion);
  
  if (browserName == "Netscape" && browserVersion >= 3) {
    // Good to go!
  } else if (browserName == "Microsoft Internet Explorer" && browserVersion >= 3) {
    // Acceptable
  } else {
    alert("This site is best viewed with Netscape Navigator 3.0 or higher!\n\nYour browser: " + browserName + " " + browserVersion);
  }
}

// Falling stars/snow effect
var snowflakes = [];
var snowflakeChars = ['*', '+', '·'];

function createSnowflake() {
  if (!document.getElementById) return;
  
  var snowflake = document.createElement('div');
  snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
  snowflake.style.position = 'absolute';
  snowflake.style.color = '#FFFFFF';
  snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.top = '-50px';
  snowflake.style.zIndex = 1000;
  
  document.body.appendChild(snowflake);
  
  var speed = Math.random() * 3 + 1;
  var wind = Math.random() * 2 - 1;
  
  function fall() {
    var top = parseFloat(snowflake.style.top);
    var left = parseFloat(snowflake.style.left);
    
    if (top < window.innerHeight) {
      snowflake.style.top = (top + speed) + 'px';
      snowflake.style.left = (left + wind) + 'px';
      setTimeout(fall, 50);
    } else {
      document.body.removeChild(snowflake);
    }
  }
  
  fall();
}

// Initialize effects
function init90sEffects() {
  // Start status bar scrolling
  if (window.enableStatusScroll !== false) {
    scrollStatus();
  }
  
  // Browser check
  if (window.enableBrowserCheck !== false) {
    checkBrowser();
  }
  
  // Right-click protection
  if (window.enableRightClickProtection) {
    document.onmousedown = noRightClick;
    document.oncontextmenu = function() { return false; };
  }
  
  // Snow effect (winter months only)
  var month = new Date().getMonth();
  if (window.enableSnowEffect && (month == 11 || month == 0 || month == 1)) {
    setInterval(createSnowflake, 500);
  }
  
  // Set page load time
  if (document.getElementById('loadTime')) {
    var loadTime = new Date();
    document.getElementById('loadTime').innerHTML = loadTime.toLocaleString();
  }
}

// Run on page load
if (window.addEventListener) {
  window.addEventListener('load', init90sEffects, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', init90sEffects);
} else {
  window.onload = init90sEffects;
}