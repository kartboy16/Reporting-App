Router.configure({
	layoutTemplate: 'form_layout'
});

Router.map(function(){
	// Login-Home
	this.route('login', {
		path: '/',
		template: 'login'
	});

	// Register
	this.route('register');

  // Dashboard
	this.route('dashboard', {
		layoutTemplate: 'dashboard_layout',
		path: '/dashboard',
		template: 'dashboard',
		onBeforeAction: function(){
			if(Meteor.user() == null){
				Router.go('/');
			}
			this.next();
		}
	});
  
  // Report
  this.route('report', {
    layoutTemplate: 'dashboard_layout',
    onBeforeAction: function(){
			if(Meteor.user() == null){
				Router.go('/');
			}
			this.next();
		}
  });
});