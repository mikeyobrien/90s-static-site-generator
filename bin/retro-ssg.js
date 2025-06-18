#!/usr/bin/env node

// ABOUTME: Main CLI entry point for retro-ssg static site generator
// ABOUTME: Handles command routing and provides help information

'use strict';

const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const Generator = require('../src/generator');

// Get command line arguments (skip node and script name)
const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

// ANSI color codes for retro terminal feel
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper function to print colored output
function print(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

// Helper function to print the retro header
function printHeader() {
  print('╔══════════════════════════════════════╗', 'cyan');
  print('║     RETRO-SSG v0.1.0 🕹️              ║', 'cyan');
  print('║  Your 90s Web Generator Tool!        ║', 'cyan');
  print('╚══════════════════════════════════════╝', 'cyan');
}

// Show help message
function showHelp() {
  printHeader();
  console.log('');
  print('USAGE:', 'bright');
  console.log('  retro-ssg <command> [options]');
  console.log('');
  print('COMMANDS:', 'bright');
  console.log('  new <site-name>  Create a new retro website');
  console.log('  build            Build your site to static HTML');
  console.log('  server           Start local development server');
  console.log('  help             Show this help message');
  console.log('');
  print('EXAMPLES:', 'bright');
  console.log('  retro-ssg new my-awesome-site');
  console.log('  retro-ssg build');
  console.log('  retro-ssg server');
  console.log('');
  print('Get ready to surf the information superhighway! 🏄', 'yellow');
}

// Command handlers (placeholder implementations)
function handleNew(siteName) {
  if (!siteName) {
    print('ERROR: Please provide a site name!', 'red');
    console.log('Usage: retro-ssg new <site-name>');
    process.exit(1);
  }
  
  print(`📁 Creating new retro site: ${siteName}`, 'green');
  console.log('TODO: This will create the site structure');
  console.log(`  - Creating ${siteName}/ directory`);
  console.log('  - Setting up content/ folder');
  console.log('  - Creating themes/retro90s/');
  console.log('  - Generating config.yml');
  print('Site creation will be implemented in Step 2!', 'yellow');
}

async function handleBuild() {
  print('🔨 Building your radical 90s website...', 'green');
  
  try {
    // Load config from config.yml if it exists
    let userConfig = {};
    const configPath = path.join(process.cwd(), 'config.yml');
    
    if (await fs.pathExists(configPath)) {
      const configContent = await fs.readFile(configPath, 'utf8');
      userConfig = yaml.load(configContent) || {};
      console.log('Loaded config from config.yml');
    }
    
    // Merge with defaults
    const config = {
      contentDir: path.join(process.cwd(), 'content'),
      outputDir: path.join(process.cwd(), userConfig.outputDir || 'output'),
      themesDir: path.join(process.cwd(), 'themes'),
      theme: userConfig.theme || 'default',
      siteTitle: userConfig.title || 'My Radical 90s Website',
      siteDescription: userConfig.description || 'Welcome to the World Wide Web!',
      siteAuthor: userConfig.author || 'WebMaster',
      siteTagline: userConfig.tagline || '',
      baseUrl: userConfig.baseUrl || ''
    };
    
    // Create generator instance
    const generator = new Generator(config);
    
    // Build the site
    const result = await generator.build();
    
    print(`✨ Build complete! Generated ${result.posts.length} posts and ${result.pages.length} pages`, 'green');
    print(`📁 Your site is ready in the 'output' directory`, 'cyan');
  } catch (error) {
    print(`❌ Build failed: ${error.message}`, 'red');
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exit(1);
  }
}

function handleServer() {
  print('🌐 Starting local web server...', 'green');
  console.log('TODO: This will start the development server');
  console.log('  - Serving files from public/');
  console.log('  - Watching for changes');
  console.log('  - Live reload support');
  print('Server functionality coming in Step 7!', 'yellow');
}

// Main command router
(async function() {
  switch (command) {
    case 'new':
      handleNew(commandArgs[0]);
      break;
      
    case 'build':
      await handleBuild();
      break;
      
    case 'server':
    case 'serve':  // Allow both variants
      handleServer();
      break;
      
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
      
    case undefined:
      // No command provided
      showHelp();
      break;
      
    default:
      // Unknown command
      print(`ERROR: Unknown command '${command}'`, 'red');
      console.log('');
      showHelp();
      process.exit(1);
  }
})();

// Debug logging for development
if (process.env.DEBUG) {
  console.log('');
  print('DEBUG INFO:', 'dim');
  console.log('  Command:', command || 'none');
  console.log('  Args:', commandArgs);
  console.log('  Node version:', process.version);
  console.log('  Platform:', process.platform);
}