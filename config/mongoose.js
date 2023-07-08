const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/contact_list_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Increased timeout value (in milliseconds)
});

const db = mongoose.connection;

db.on('error', function(err) {
  console.error('MongoDB connection error:', err);
});

db.on('connecting', function() {
  console.log('Connecting to MongoDB...');
});

db.on('connected', function() {
  console.log('Connected to MongoDB!');
});

db.on('open', function() {
  console.log('MongoDB connection opened!');
});

db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
});

process.on('SIGINT', function() {
  db.close(function() {
    console.log('MongoDB connection closed due to the application termination');
    process.exit(0);
  });
});
