const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 64, 80];
const color = '#0078D4'; // Microsoft blue

async function createIcon(size) {
  // Create a simple SVG with a link icon
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${color}"/>
      <path d="M ${size * 0.25} ${size * 0.5} L ${size * 0.5} ${size * 0.25} L ${size * 0.75} ${size * 0.5} L ${size * 0.5} ${size * 0.75} Z"
            fill="white"/>
    </svg>
  `;

  const outputPath = path.join(__dirname, 'assets', `icon-${size}.png`);

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`Created ${outputPath}`);
}

async function main() {
  for (const size of sizes) {
    await createIcon(size);
  }
  console.log('All icons created successfully!');
}

main().catch(console.error);
