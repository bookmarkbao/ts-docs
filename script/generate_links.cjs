const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const output = [];
const exclusions = [path.join(docsDir, 'index.md'), path.join(docsDir, '.vitepress')];

function scanDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        // Check if the file or directory is in the exclusions
        if (exclusions.some(exclusion => fullPath === exclusion)) {
            return; // Skip this file or directory
        }

        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else if (stat.isFile() && file.endsWith('.md')) {
            extractLinks(fullPath);
        }
    });
}

function extractLinks(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const dirName = path.dirname(filePath).split(path.sep).pop();
    const fileName = path.basename(filePath, '.md');
    const title = dirName === 'docs' ? fileName : `${dirName}-${fileName}`;
    const link = filePath.replace(docsDir, '').replace(/\\/g, '/').replace(/\.md$/, '');
    output.push({ text: title, link });
}

scanDirectory(docsDir);
console.log(JSON.stringify(output, null, 2));
// Write output to sidebar.ts
const sidebarPath = path.join(__dirname, '../docs/.vitepress/sidebar.ts');
fs.writeFileSync(sidebarPath, `export default [\n${output.map(item => `  { text: "${item.text}", link: "${item.link}" },`).join('\n')}\n];\n`);