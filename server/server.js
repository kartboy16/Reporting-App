Meteor.startup(function() {
  process.env.MAIL_URL = "smtp://postmaster%40sandboxa9b10a7070cf4a2e9e668ea22425ed9a.mailgun.org:637ba80fa3de730293589903ff4f6c6e@smtp.mailgun.org:587";
  
  // Allow rules for security. Should look familiar!
  // Without these, no file writes would be allowed
  MyReports.allow({
    // The creator of a file owns it. UserId may be null.
    insert: function (userId, file) {
      // Assign the proper owner when a file is created
      file.metadata = file.metadata || {};
      file.metadata.owner = userId;
      return true;
    },
    // Only owners can remove a file
    remove: function (userId, file) {
      // Only owners can delete
      return (userId === file.metadata.owner);
    },
    // Only owners can retrieve a file via HTTP GET
    read: function (userId, file) {
      return (userId === file.metadata.owner);
    },
    // This rule secures the HTTP REST interfaces' PUT/POST
    // Necessary to support Resumable.js
    write: function (userId, file, fields) {
      // Only owners can upload file data
      return (userId === file.metadata.owner);
    }
  });
});

Meteor.methods({
  emailReport: function(to, from, subject, body, fileInfoId) {
    // console.log(fileInfoId);
    
    var doc = ReportInfo.findOne({ _id: fileInfoId });
    console.log("Name: " + doc.name);
    var data = doc.image.getFileRecord();
    console.log(data._id);

    var mongo = Meteor.npmRequire('mongodb');
    var Grid = Meteor.npmRequire('gridfs-stream');
    
    var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
    var gfs = Grid(db, mongo);
    // make sure the db instance is open before passing into `Grid`
//    db.open(function (err) {
//      if (err) return handleError(err);
//      console.log("Db Open!");
//      
//
//      // all set!
//    })
    
    var filename = 'reportImages-' + data._id;
    console.log(filename);
    
    gfs.exist({ filename: "reportImages-hQf5mCixkiGn7z6Qp" }, function (err, found) {
      if (err) return handleError(err);
      found ? console.log('File exists') : console.log('File does not exist');
    });
    
//    var stream = MyReports.findOneStream({ filename: filename });
//    stream.on('data', (chunk) => {
//      console.log('got %d bytes of data', chunk.length);
//    });
    

    
//    var readstream = gfs.createReadStream({
//      _id: imageId
//    });
//    
//    var response = [];
//    
//    readstream.pipe(response);
    
    
//    var readStream = doc.createReadStream();
//    HTTP.get(doc.url(),function(err,result){
//      // this will be async obviously
//      if ( err ) console.log("Error "+err+" downloading file"+myId);
//      else {
//        var content = result.content; // the contents of the file
//        // now do something with it
//        console.log(content);
//      }
//    });
    
    // Helper function to retrieve the binary content of a CFS file with base64 encoding
//    var getBase64Data = function(file, callback) {
//      // callback has the form function (err, res) {}
//      var readStream = file.createReadStream();
//      var buffer = [];
//      readStream.on('data', function(chunk) {
//        buffer.push(chunk);
//      });
//      readStream.on('error', function(err) {
//        callback(err, null);
//      });
//      readStream.on('end', function() {
//        callback(null, buffer.concat()[0].toString('base64'));
//        
//        var attachment = {
//          fileName: 'YourReport.png',
//          filePath: buffer
//        };
//
//        Email.send({
//          to: to,
//          from: from,
//          subject: subject,
//          attachments: [attachment]
//        });
//      });
//    };
//
//    getBase64DataSync = Meteor.wrapAsync(getBase64Data);
//    
//    var data = getBase64DataSync(doc);
//    console.log(data);
    
    // Try this next: Helper function to retrieve the binary content of a CFS file with base64 encoding
//    var getBase64Data = function(file, callback) {
//      // callback has the form function (err, res) {}
//      var readStream = file.createReadStream();
//      var buffer = [];
//      readStream.on('data', function(chunk) {
//        buffer.push(chunk);
//      });
//      readStream.on('error', function(err) {
//        callback(err, null);
//      });
//      readStream.on('end', function() {
//        callback(null, buffer.concat()[0].toString('base64'));
//      });
//    };
//
//    getBase64DataSync = Meteor.wrapAsync(getBase64Data);
//    var buffer = new Buffer(0);
//    readStream.on('readable', function() {
//        buffer = Buffer.concat([buffer, readStream.read()]);
//    });
//    readStream.on('end', function() {
//        console.log(buffer.toString('base64'));
//    });
//    

//    var imageURL = '/cfs/files/images/' + imageId;
//    var imageBase64 = canvas.toDataURL();
//    var imageBuffer2 = new Buffer(imageBase64.replace('data:image/png;base64,','') || '', 'base64');
//    doc.image(imageURL, 10, 10, {height: 75});
//    doc.fontSize(12);
//    doc.text('PDFKit works??', 10, 30, {align: 'center', width: 200});
//    doc.writeSync(process.env.PWD + '/public/pdf/PDFKitExample.pdf');
  }
});