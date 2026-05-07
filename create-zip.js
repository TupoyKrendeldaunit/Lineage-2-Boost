import fs from 'fs';
import archiver from 'archiver';

const output = fs.createWriteStream('timeweb-build.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log('Archive created successfully! Total bytes: ' + archive.pointer());
  console.log('You can now download "timeweb-build.zip" from the file explorer.');
});

output.on('end', function() {
  console.log('Data has been drained');
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// append files from the dist directory, putting its contents at the root of archive
archive.directory('dist/', false);

archive.finalize();
