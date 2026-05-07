import AdmZip from 'adm-zip';

const zip = new AdmZip();
console.log('Adding dist folder to zip...');
zip.addLocalFolder('./dist');

const outputPath = './timeweb-ready.zip';
zip.writeZip(outputPath);
console.log(`Successfully created ${outputPath}`);
