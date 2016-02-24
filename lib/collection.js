Plans = new Mongo.Collection("Plans");

// Product Image Collection
ReportImages = new FS.Collection("reportImages", {
    stores: [new FS.Store.GridFS("reportImages")]
});

ReportImages.allow({
    insert: function(fileId, doc) {
      if(Meteor.userId()) {
          return true;
      }
    },
    download: function(fileId, doc) {
      if(Meteor.userId()) {
          return true;
        }
    },
    remove: function(fileId, doc) {
      if(Meteor.userId()) {
          return true;
        }
    },
    update: function(fileId, doc) {
      if(Meteor.userId()) {
          return true;
        }
    }
});

// Product Image Collection
ReportInfo = new Mongo.Collection("reportFiles");


//// Report Images
MyReports = new FileCollection('myReports',
  { resumable: true,    // Enable built-in resumable.js chunked upload support
    http: [             // Define HTTP route
      { method: 'get',  // Enable a GET endpoint
        path: '/:md5',  // this will be at route "/gridfs/myFiles/:md5"
        lookup: function (params, query) {  // uses express style url params
          return { md5: params.md5 };       // a query mapping url to myFiles
}}]});