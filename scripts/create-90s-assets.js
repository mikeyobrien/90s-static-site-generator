// ABOUTME: Script to create base64-encoded 90s web assets
// ABOUTME: Generates GIFs and patterns for authentic 90s styling

const fs = require('fs-extra');
const path = require('path');

// Base64-encoded 90s assets
const assets = {
  // Under Construction animated GIF (simplified version)
  underConstruction: 'R0lGODlhZABkAPYAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAAAAACH5BAEAAAAALAAAAABkAGQAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dwHAMAADs=',
  
  // Email icon (envelope)
  emailIcon: 'R0lGODlhGAAYAPEAAAAAAPj4+AAAAAAACH5BAEAAAgALAAAAAAYABgAAAIslI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8eyTNf2jef6zvf+DwwKBwUAOw==',
  
  // NEW! badge
  newBadge: 'R0lGODlhFAAKAPAAAPAAAP///yH5BAEAAAEALAAAAAAUAAoAAAIXjI+py+0Po5y0BgAzVhpwDz2cRJZmiRQAOw==',
  
  // Flame divider
  flameDivider: 'R0lGODlhAQAYAPEAAP8AAP//AAAAAAAAAACH5BAEAAAIALAAAAAABABgAAAIHhI+py+1dAAA7',
  
  // Spinning globe placeholder
  spinningGlobe: 'R0lGODlhIAAgAPEAAAAAAPj4+AAAAAAACH5BAEAAAgALAAAAAAgACAAAAjJAI0JECqpMOTKtw4rXAghxo0aKBAQoI5EMiLFixQMBBhJk2RJkwIBAjBZgKXLlzBjxgQAOw==',
  
  // Starry background pattern
  starryBg: 'R0lGODlhCgAKAPAAAAAAAP///yH5BAEAAAEALAAAAAAKAAoAAAIRhI8Jwe0eo3stGmplxlb67wUAOw==',
  
  // Grid pattern
  gridBg: 'R0lGODlhEAAQAPAAAMzMzP///yH5BAEAAAEALAAAAAAQABAAAAIfhG+hq4jM3IFLJhoswNly/XkcBpIiVaInlLJr9FZWAQA7',
  
  // Counter digit (shows "8")
  counterDigit: 'R0lGODlhBwAKAPAAAAAAAP///yH5BAEAAAEALAAAAAAHAAoAAAINjI95wN3hnolJPmqvAAA7'
};

// Create directories and save assets
async function createAssets() {
  const baseDir = path.join(__dirname, '..', 'themes', 'default', 'images');
  
  console.log('Creating 90s web assets...');
  
  // Save animated GIFs
  await fs.writeFile(
    path.join(baseDir, 'animations', 'under-construction.gif'),
    Buffer.from(assets.underConstruction, 'base64')
  );
  console.log('✓ Created under-construction.gif');
  
  // Save icons
  await fs.writeFile(
    path.join(baseDir, 'icons', 'email.gif'),
    Buffer.from(assets.emailIcon, 'base64')
  );
  await fs.writeFile(
    path.join(baseDir, 'icons', 'globe.gif'),
    Buffer.from(assets.spinningGlobe, 'base64')
  );
  console.log('✓ Created icon GIFs');
  
  // Save badges
  await fs.writeFile(
    path.join(baseDir, 'badges', 'new.gif'),
    Buffer.from(assets.newBadge, 'base64')
  );
  console.log('✓ Created badge GIFs');
  
  // Save dividers
  await fs.writeFile(
    path.join(baseDir, 'dividers', 'flame.gif'),
    Buffer.from(assets.flameDivider, 'base64')
  );
  console.log('✓ Created divider GIFs');
  
  // Save backgrounds
  await fs.writeFile(
    path.join(baseDir, 'backgrounds', 'stars.gif'),
    Buffer.from(assets.starryBg, 'base64')
  );
  await fs.writeFile(
    path.join(baseDir, 'backgrounds', 'grid.gif'),
    Buffer.from(assets.gridBg, 'base64')
  );
  console.log('✓ Created background patterns');
  
  // Save buttons
  await fs.writeFile(
    path.join(baseDir, 'buttons', 'counter.gif'),
    Buffer.from(assets.counterDigit, 'base64')
  );
  console.log('✓ Created button/counter GIFs');
  
  // Create additional text files for Netscape badges
  const netscapeBadgeHTML = `<a href="http://www.netscape.com">
<img src="/images/badges/netscape.gif" width="88" height="31" border="0" alt="Best viewed with Netscape Navigator">
</a>`;
  
  await fs.writeFile(
    path.join(baseDir, 'badges', 'netscape-badge.html'),
    netscapeBadgeHTML
  );
  
  console.log('\n✅ All 90s assets created successfully!');
}

// Run if called directly
if (require.main === module) {
  createAssets().catch(console.error);
}

module.exports = { createAssets };