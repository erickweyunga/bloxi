// Run this in Node.js to check what's exported from your built package
import fs from 'fs';
import path from 'path';

// Path to your built file
const filePath = path.resolve('C:/Users/maver/opensource/bloxi/packages/core/dist/index.js');

// Read the file content
const content = fs.readFileSync(filePath, 'utf8');

// Print the file content to examine exports
console.log(content);

// You can also check if specific strings exist
console.log('Contains "export { Box }":', content.includes('export { Box }'));
console.log('Contains "Box":', content.includes('Box'));