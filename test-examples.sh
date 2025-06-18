#!/bin/bash
# Quick test script to verify both example sites build correctly

set -e

echo "Testing example site builds..."
echo ""

# Test default theme
echo "1. Testing default theme build..."
cd examples/default-theme
if [ ! -L "themes" ]; then
    ln -s ../../themes themes
fi
../../bin/retro-ssg.js build > /dev/null 2>&1
if [ -f "output/posts/welcome.html" ]; then
    echo "   ✓ Default theme build successful"
else
    echo "   ✗ Default theme build failed"
    exit 1
fi
cd ../..

# Test minimal-90s theme
echo "2. Testing minimal-90s theme build..."
cd examples/minimal-90s-theme
if [ ! -L "themes" ]; then
    ln -s ../../themes themes
fi
../../bin/retro-ssg.js build > /dev/null 2>&1
if [ -f "output/posts/hello-world.html" ]; then
    echo "   ✓ Minimal-90s theme build successful"
    # Check if theme assets are correctly referenced
    if grep -q "minimal-90s/css/style.css" output/posts/hello-world.html; then
        echo "   ✓ Theme assets correctly referenced"
    else
        echo "   ✗ Theme assets not correctly referenced"
        exit 1
    fi
else
    echo "   ✗ Minimal-90s theme build failed"
    exit 1
fi
cd ../..

echo ""
echo "All tests passed! Both example sites built successfully."
echo ""
echo "To view the sites:"
echo "  cd examples/default-theme && python3 -m http.server 8000 --directory output"
echo "  cd examples/minimal-90s-theme && python3 -m http.server 8001 --directory output"