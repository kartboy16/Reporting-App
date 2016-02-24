if (Meteor.isClient) {
  Meteor.startup(function () {
    WebFontConfig = {
      google: { families: [ 'Yantramanav:900:latin', 'Biryani:800:latin', 'Just+Another+Hand::latin', 'Kanit:800:latin', 'Titillium+Web:700:latin', 'Work+Sans:700:latin' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })(); 
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
