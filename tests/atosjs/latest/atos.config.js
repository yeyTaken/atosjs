const { GiftManager, TimeFormat } = require('../../../packages/atosjs/dist/index.cjs');

module.exports = { 
  // GiftManager instance:
  // If no database is specified, it defaults to QuickDB with the "json.sqlite" file.
  // To disable logs (default: true), uncomment 'logging: false'.
  // To use QuickDB with a specific file, uncomment 'quickdb: { filePath: "data.db" }'.
  // To use MongoDB, uncomment 'mongodb: { connect: "MONGO_URI", dbName: "your-db-name" }'.
  gift: new GiftManager({
    // logging: false, // Disable logs
    // quickdb: { filePath: 'data.db' }, // Use QuickDB with 'data.db'
    // mongodb: { connect: 'MONGO_URI', dbName: 'your-db-name' }, // Use MongoDB
  }),

  // TimeFormat instance for handling time-related operations.
  t: new TimeFormat(),
};
