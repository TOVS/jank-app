var whereAreWe = function() {
    // Ask the device for the current position;
    // When we find it run the function ‘updatePosition’ (a ‘callback’)
    navigator.geolocation.getCurrentPosition(updatePosition, onError);
};

var updatePosition = function(position) {
    var $results = $('#results');
	console.log(position);
    $results.html( "latitude " + position.coords.latitude + ", longitude " + position.coords.longitude  );
    
    $("#loading").addClass("hidden");
    $results.removeClass("hidden");
};

var onError = function(error) {
    // this code is run if the app fails in finding out where we are
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

var initialize = function() {
    whereAreWe();
};
