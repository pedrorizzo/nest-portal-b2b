const fs = require('fs');
const path = require('path');

module.exports = (docBuilder) => {
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== 'index.js' &&
        file !== 'indexed.js' &&
        file !== 'index.ts' &&
        file.endsWith('.js') &&
        file !== 'README.md',
    )
    .forEach((file) => {
      const resourceImport = require(path.resolve(__dirname, file));
      const key = Object.key(resourceImport)[0];
      const resource = resourceImport[key];
      docBuilder.addTag(resourve.tag, resource.description);
    });
};
