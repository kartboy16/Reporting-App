Template.navbar.events({
  "click .logout-btn": function(event){
    Meteor.logout(function(err){
      if(err){
          FlashMessages.sendError(err.reason);
      } else {
          FlashMessages.sendSuccess('You are now logged out!');
          Router.go('/')
      }
    });
  }
});

Template.registerHelper('active', function(routeName) {
  var curRoute = Router.current().route;
  return curRoute.getName() === routeName ? 'active' : '';
});