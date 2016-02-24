// TODO: [x]Create collection of Plans
Template.dashboard.rendered = function() {   
  $('.panel').matchHeight();
  $('.input-field').matchHeight();
};

Template.dashboard.events({
  'click #create_report': function(event) {
    if (!Meteor.userId()) {
      Router.go('/');
    } else {
      Router.go('/report');
    }
  }
});

Template.dashboard.onCreated(function() {
  $(window).resize(function() {
    drawChart();
  });
});

function setupPopover() {
  var popover = $('[data-toggle="popover"]').popover({
    html: true,
    trigger: 'manual',
    content: function() {
      return $('#popover-content').html();
    },
    container: 'body',
    placement: 'left'
  }).click(function(e) {
    $('[data-toggle="popover"]').not(this).popover('hide');
    $(this).popover('toggle');
  });
  
  popover.on('show.bs.popover', function(e){
    popover.data("bs.popover").tip().css({ "max-width" : "50%" });
  });
  
  popover.on('shown.bs.popover', function(e){
    //Perform formating, Enter values
  });
  
  popover.on('hide.bs.popover', function(e){
    // Set values
  });
  
  $(document).click(function(e){
    if (!$(e.target).is('.popup-marker, .popover-title, .popover-content')) {
      $('.popover-marker').popover('hide');
    }
  });
}