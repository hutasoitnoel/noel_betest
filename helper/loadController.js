const fs = require('fs')
const path = require('path')

module.exports = app => {
    const routesPath = path.join(__dirname, '../controller');
    fs.readdirSync(routesPath).forEach((file) => {
        const filePath = path.join(routesPath, file);
        if (file.endsWith('.js')) {
            require(filePath)(app);
        }
    });
};