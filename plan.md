# 90s Static Site Generator Implementation Plan

## Overview
This plan breaks down the development of a 90s-themed static site generator into small, iterative steps. Each step builds upon the previous one, ensuring no orphaned code and continuous integration.

## Technology Choice
We'll use Node.js/JavaScript for this project because:
- Wide ecosystem for markdown parsing (markdown-it)
- Built-in file system and HTTP server capabilities
- Easy distribution via npm
- Familiar to most developers

## Implementation Steps

### Step 1: Project Setup and Basic CLI Structure
Create the foundational project structure with a basic CLI that can be invoked.

**Prompt:**
```text
Create a new Node.js project for a static site generator called "retro-ssg". 

Requirements:
1. Initialize a package.json with:
   - Name: "retro-ssg"
   - Version: "0.1.0"
   - Main entry point: "bin/retro-ssg.js"
   - bin field pointing to the CLI script
2. Create a basic CLI script at bin/retro-ssg.js that:
   - Uses #!/usr/bin/env node shebang
   - Accepts command line arguments
   - Has a basic switch statement for commands: "new", "build", "server"
   - Each command should just console.log what it will do
3. Add a simple help message when no command is provided
4. Make the CLI executable
5. Test that "node bin/retro-ssg.js" works with different commands

The goal is just to have a working CLI skeleton that we can build upon.
```

### Step 2: Implement "new site" Command
Add functionality to create a new site with the required directory structure.

**Prompt:**
```text
Extend the retro-ssg CLI to implement the "new site <name>" command.

Requirements:
1. Parse the site name from the command arguments
2. Create the following directory structure:
   - <site-name>/
     - content/
     - public/
     - themes/
       - retro90s/
     - config.yml
3. Create a default config.yml with:
   title: "My Rad 90s Site"
   author: "Webmaster"
   theme: "retro90s"
4. Add error handling for:
   - Missing site name
   - Directory already exists
   - File system errors
5. Show success message with next steps

The command should work like: "retro-ssg new site my-awesome-site"
```

### Step 3: Create Basic 90s Theme Structure
Set up the theme system with HTML templates and CSS.

**Prompt:**
```text
Create the basic 90s theme structure in the themes/retro90s directory.

Requirements:
1. Create these files in themes/retro90s/:
   - templates/page.html (main page template)
   - templates/index.html (index page template)
   - static/style.css
   - static/background.gif (describe what should be there)
2. page.html template should include:
   - Basic HTML5 structure
   - Placeholders for {{title}}, {{content}}, {{site_title}}
   - Link to style.css
3. index.html template should include:
   - Similar structure to page.html
   - Placeholder for {{posts}} list
   - "Under Construction" section
4. style.css should have:
   - Tiled background image
   - Centered content (max-width: 800px)
   - Times New Roman font
   - Classic link colors (blue unvisited, purple visited)
   - 90s-style borders and spacing
5. Add a simple README in the theme directory explaining the template variables

Keep the CSS simple but authentically 90s.
```

### Step 4: Implement Markdown Parser
Add markdown parsing functionality as a separate module.

**Prompt:**
```text
Create a markdown parser module for retro-ssg.

Requirements:
1. Install markdown-it as a dependency
2. Create lib/markdown.js that exports a parse function
3. The parse function should:
   - Accept markdown content as input
   - Parse front matter (between --- delimiters) for title, date, etc.
   - Convert markdown body to HTML
   - Return object with { metadata, html }
4. Support front matter fields:
   - title (required)
   - date (optional, default to current date)
   - author (optional)
5. Configure markdown-it for:
   - HTML enabled
   - Link auto-conversion
   - Code syntax highlighting (using highlight.js)
6. Add error handling for invalid markdown
7. Create a simple test file to verify the parser works

The module should be reusable across different commands.
```

### Step 5: Implement Basic Build Command
Create the build command that processes markdown files.

**Prompt:**
```text
Implement the "build" command for retro-ssg that converts markdown to HTML.

Requirements:
1. In the build command:
   - Read all .md files from content/ directory
   - Parse each file using the markdown module from step 4
   - Load the page.html template from the active theme
   - Load config.yml for site settings
2. For each markdown file:
   - Replace template variables with actual content
   - Save as .html in public/ directory with same name
   - Preserve any subdirectory structure
3. Copy static assets from theme to public:
   - CSS files
   - Images
   - Any other static resources
4. Add error handling for:
   - Missing content directory
   - Missing theme
   - Template errors
5. Show progress as files are processed
6. Display summary when complete

The build should work from within a site directory.
```

### Step 6: Generate Index Page
Add index page generation to the build process.

**Prompt:**
```text
Extend the build command to generate an index.html page listing all posts.

Requirements:
1. After processing all markdown files:
   - Collect metadata from all posts
   - Sort posts by date (newest first)
   - Load the index.html template
2. Generate the posts list with:
   - Post title as link to the HTML file
   - Post date
   - Author if available
3. Template the index page with:
   - Site title from config
   - Generated posts list
   - Same CSS/styling as other pages
4. Add special handling for index.md if it exists:
   - Don't include in posts list
   - Use its content for the homepage instead
5. Save index.html to public/ directory
6. Update build progress to show index generation

The index should be automatically generated every build.
```

### Step 7: Implement Development Server
Create a simple HTTP server with file watching.

**Prompt:**
```text
Implement the "server" command for retro-ssg with live reload capability.

Requirements:
1. Create a development server that:
   - Serves files from the public/ directory
   - Defaults to port 3000 (configurable via --port)
   - Shows the local URL when started
2. Add file watching for:
   - content/ directory (*.md files)
   - themes/ directory (templates and CSS)
   - config.yml
3. On file change:
   - Run the build command automatically
   - Log which file changed
   - Show build errors without crashing
4. Add basic live reload:
   - Inject a simple script into HTML pages during dev
   - Reload the browser when build completes
5. Handle common errors:
   - Port already in use
   - Missing public directory (run build first)
6. Add keyboard shortcut info (Ctrl+C to stop)

The server should make development iteration quick and easy.
```

### Step 8: Implement "new" Command for Posts
Add the ability to create new markdown files with front matter.

**Prompt:**
```text
Implement the "new <filename>" command to create new markdown posts.

Requirements:
1. Parse the filename from arguments:
   - Accept with or without .md extension
   - Support paths like "posts/my-post.md"
2. Create the markdown file in content/ with:
   - Front matter template
   - Title derived from filename
   - Current date
   - Author from config.yml
3. Front matter template:
   ---
   title: "Title Here"
   date: 2024-01-20
   author: "Webmaster"
   ---
   
   # Title Here
   
   Your content here...
4. Create subdirectories if needed
5. Error handling for:
   - File already exists
   - Invalid filename
6. Success message with file path
7. Optional: Open in default editor if --edit flag provided

This speeds up content creation with consistent formatting.
```

### Step 9: Add Theme Asset Processing
Enhance the theme system with better asset handling.

**Prompt:**
```text
Improve theme asset processing in the build command.

Requirements:
1. Create lib/theme.js module for theme operations:
   - Load theme configuration
   - Get template paths
   - List theme assets
2. During build, intelligently copy theme assets:
   - Only copy if newer than destination
   - Preserve directory structure
   - Support nested directories
3. Add special processing for:
   - .css files: Add cache-busting query parameter
   - Images: Copy as-is
   - .js files: Copy as-is
4. Create manifest of theme assets in public/
5. Template improvements:
   - Add {{theme_url}} variable for asset paths
   - Support partial templates (header, footer)
6. Theme validation:
   - Check required templates exist
   - Warn about missing assets
   - Provide helpful error messages

This makes themes more robust and easier to develop.
```

### Step 10: Polish and Error Handling
Add final polish, error handling, and user experience improvements.

**Prompt:**
```text
Add final polish and comprehensive error handling to retro-ssg.

Requirements:
1. Improve CLI user experience:
   - Add --version flag
   - Add --help flag with detailed command info
   - Colorize output (success=green, error=red, info=blue)
   - Add emoji for fun (🚀 for build, 🎉 for success)
2. Enhanced error messages:
   - Check if running from site directory
   - Suggest fixes for common issues
   - Add --verbose flag for debugging
3. Configuration validation:
   - Validate config.yml on load
   - Check theme exists
   - Provide defaults for missing values
4. Build optimizations:
   - Skip unchanged files (compare timestamps)
   - Parallel processing for multiple files
   - Progress bar for large sites
5. Add retro-ssg.json for site metadata:
   - Version of retro-ssg used
   - Build timestamp
   - File count
6. Create proper README.md with:
   - Installation instructions
   - Quick start guide
   - Command reference
   - Theme development guide

This completes the MVP with a polished user experience.
```

## GitHub Issues

Each step above should be created as a GitHub issue with:
- Clear acceptance criteria
- Links to dependent issues
- Labels: "enhancement", "good first issue" (where appropriate)
- Milestone: "MVP"

## Testing Strategy

After each step:
1. Manual testing of the implemented feature
2. Integration test ensuring previous features still work
3. Document any breaking changes

## Success Criteria

The MVP is complete when:
1. All commands work as specified
2. A sample site can be created and built
3. The development server provides a good experience
4. The 90s theme looks authentically retro
5. Documentation is complete