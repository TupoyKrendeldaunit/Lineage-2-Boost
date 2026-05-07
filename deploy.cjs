const { execSync } = require('child_process');
try {
    console.log('Building with absolute root / base for Timeweb...');
    execSync('npx vite build --base=/', { stdio: 'inherit', cwd: process.cwd() });
    
    console.log('Zipping...');
    process.chdir('dist');
    execSync('npx -y bestzip ../timeweb-site.ru.zip *', { stdio: 'inherit' });
    console.log('Archive built successfully!');
} catch(e) {
    console.error('Error:', e.message);
}
