Template.report.rendered = function() {
  drawChart();
  $('#equal-note div').equalHeights();
};

Template.report.events({
  'click #create_pdf': function() {
    var doc = new jsPDF('p', 'mm', 'a4');

    doc.addHTML($("#full_report").get(0), function() {
      doc.save('Report.pdf');
    });
  },
  
  'click #send_as_email': function() {
    
    html2canvas($('#full_report').get(0), {
      onrendered: function(canvas) {
//         $('#report_image').append(canvas);
        
        // Use case:
        // Write image file to Database
        // Keep a record of it for future reference
        // Show a modal email
        // Fill in the To: From: and add the image to the body
        // If hit send, Meteor.call('emailReport', to, from, Subject, BodyText, imageReferenceOnDB)
        var imageData = canvas.toDataURL("image/png");
        ReportImages.insert(imageData, function(err, fileObj) {
          if (err) {
            console.log('Error writing to DB: ' + err.description);
          } else {
            console.log(fileObj);
            var fileInfo = ReportInfo.insert({
              _id: fileObj._id,
              name: "yourReport.png",
              image: fileObj
            });
            
            Meteor.call('emailReport', 'someone@me.com', 'somewhere@me.com', 'Report', 'me', fileInfo); 
          }
        });
      }
    });
  }
});

Template.report.helpers({
  currentYear: function() {
    return moment().format('YYYY');
  },
  currentDate: function() {
    return moment().format("MMM Do YYYY");
  },
  isPhoneOrTablet: function() {
    if (Meteor.Device.isPhone() || Meteor.Device.isTablet()) {
      console.log("Phone? " + Meteor.Device.isPhone() + " Tablet? " + Meteor.Device.isTablet());
      return "hide";
    }
  }
});