// import { readdirSync, statSync } from 'fs';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// // Get all folder names in the current directory
// const folderNames = readdirSync(__dirname).filter(file => {
//   return statSync(join(__dirname, file)).isDirectory();
// });

// // Dynamically import each folder using es6 (Ex. import Home from './Home')
// const imports = {}
// for (const folderName of folderNames) {
//   import(`./${folderName}/index.jsx`).then(module => {
//     imports[folderName] = module.default;
//   });
// }
import Home from './Home/index.jsx';
import Login from './Login/index.jsx';
import Restaurant from './Restaurant/index.jsx';


export {
    Home,
    Login,
    Restaurant,
    };
