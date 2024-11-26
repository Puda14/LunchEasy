import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Get all folder names in the current directory
const folderNames = readdirSync(__dirname).filter(file => {
  return statSync(join(__dirname, file)).isDirectory();
});

// Dynamically import each folder using es6 (Ex. import Home from './Home')
const imports = {}
for (const folderName of folderNames) {
  import(folderName).then(module => {
    imports[folderName] = module.default;
  });
}


export default imports;
