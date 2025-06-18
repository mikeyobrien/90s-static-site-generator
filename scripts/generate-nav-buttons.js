// ABOUTME: Generates navigation button images for 90s-style sites
// ABOUTME: Creates text-based button GIFs with beveled edges

const fs = require('fs-extra');
const path = require('path');

// Simple button generator using base64 encoded templates
const buttonTemplates = {
  // Base button (gray, 80x30)
  normal: 'R0lGODlhUAAdAPEAAMzMzP///wAAAAAAACH5BAEAAAIALAAAAAAQAB0AAAIylI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKhUAOw==',
  
  // Hover state (blue tint)
  hover: 'R0lGODlhUAAdAPEAAACZzP///wAAAAAAACH5BAEAAAIALAAAAAAQAB0AAAIylI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKhUAOw==',
  
  // Small navigation arrow
  arrow: 'R0lGODlhDAAMAPEAAAAAAP///wAAAAAAACH5BAEAAAgALAAAAAAMAAwAAAINjI+py+0Po5y02ouzAAA7',
  
  // Navigation divider
  divider: 'R0lGODlhAgAeAPEAAAAAAICAgP///wAAACH5BAEAAAMALAAAAAACHgAAAgm0GWYnYl0JlQIAOw==',
  
  // Bullet point
  bullet: 'R0lGODlhCAAIAPEAAAAAAP///wAAAAAAACH5BAEAAAgALAAAAAAIAAgAAAIHjI+py+1dAAA7',
  
  // Star icon
  star: 'R0lGODlhDAAMAPEAAP//AAAAAAAAAAAACH5BAEAAAgALAAAAAAMAAwAAAIPjI+py+0PYwK0WoCzXhwAADs=',
  
  // Random button
  random: 'R0lGODlhUAAdAPEAAP8AAMzMzP///wAAACH5BAEAAAMALAAAAAAQAAdAAAI7lI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqnVAAAOw=='
};

async function generateButtons() {
  const outputDir = path.join(__dirname, '..', 'themes', 'default', 'images', 'buttons');
  
  console.log('Generating navigation button images...');
  
  // Save each button type
  for (const [name, data] of Object.entries(buttonTemplates)) {
    const outputPath = path.join(outputDir, `${name}.gif`);
    await fs.writeFile(outputPath, Buffer.from(data, 'base64'));
    console.log(`✓ Created ${name}.gif`);
  }
  
  // Create specific navigation buttons
  const navButtons = ['home', 'about', 'links', 'guestbook', 'sitemap', 'prev', 'next'];
  
  // For now, use the base template for all nav buttons
  for (const button of navButtons) {
    await fs.writeFile(
      path.join(outputDir, `${button}.gif`),
      Buffer.from(buttonTemplates.normal, 'base64')
    );
    
    // Also create hover state
    await fs.writeFile(
      path.join(outputDir, `${button}-hover.gif`),
      Buffer.from(buttonTemplates.hover, 'base64')
    );
    
    console.log(`✓ Created ${button}.gif and ${button}-hover.gif`);
  }
  
  // Create disabled states
  const disabledTemplate = buttonTemplates.normal; // Gray out effect
  await fs.writeFile(
    path.join(outputDir, 'prev-disabled.gif'),
    Buffer.from(disabledTemplate, 'base64')
  );
  await fs.writeFile(
    path.join(outputDir, 'next-disabled.gif'),
    Buffer.from(disabledTemplate, 'base64')
  );
  
  console.log('\n✅ All navigation buttons generated!');
  console.log('\nNote: These are placeholder buttons. For authentic 90s buttons with');
  console.log('text rendering, consider using an image generation library like');
  console.log('node-canvas or generating them in an image editor.');
}

// Create more icon types
async function generateIcons() {
  const iconsDir = path.join(__dirname, '..', 'themes', 'default', 'images', 'icons');
  
  const icons = {
    // Home icon
    home: 'R0lGODlhEAAQAPEAAAAAAP///wAAAAAAACH5BAEAAAgALAAAAAAQABAAAAIfjI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8dkAQA7',
    
    // Arrow right
    arrow: 'R0lGODlhDAAMAPEAAAAAAP///wAAAAAAACH5BAEAAAgALAAAAAAMAAwAAAINjI+py+0Po5y02ouzAAA7',
    
    // Bullet
    bullet: 'R0lGODlhCAAIAPEAAAAAAP///wAAAAAAACH5BAEAAAgALAAAAAAIAAgAAAIHjI+py+1dAAA7',
    
    // Star
    star: 'R0lGODlhDAAMAPEAAP//AAAAAAAAAAAACH5BAEAAAgALAAAAAAMAAwAAAIPjI+py+0PYwK0WoCzXhwAADs='
  };
  
  for (const [name, data] of Object.entries(icons)) {
    await fs.writeFile(
      path.join(iconsDir, `${name}.gif`),
      Buffer.from(data, 'base64')
    );
    console.log(`✓ Created icon: ${name}.gif`);
  }
}

// Run if called directly
if (require.main === module) {
  Promise.all([
    generateButtons(),
    generateIcons()
  ]).catch(console.error);
}

module.exports = { generateButtons, generateIcons };