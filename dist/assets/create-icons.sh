#!/bin/bash
# Create simple PNG icons using ImageMagick or convert

for size in 16 32 64 80; do
  # Create a simple colored square with a white icon shape
  convert -size ${size}x${size} xc:"#0078D4" \
    -gravity center \
    -fill white \
    -draw "path 'M $(($size/4)) $(($size/2)) L $(($size/2)) $(($size/4)) L $(($size*3/4)) $(($size/2)) L $(($size/2)) $(($size*3/4)) Z'" \
    icon-${size}.png 2>/dev/null
done
