// in country_reverse_geocoding.js we included a function, that on the basis
// of a latitude and longitude attempts to find out in what country we are
var rgc = new country_reverse_geocoding();

var whereAreWe = function() {
    // Ask the device for the current position;
    // When we find it run the function ‘updatePosition’ (a ‘callback’)
    navigator.geolocation.getCurrentPosition(updatePosition, onError);
};

var updatePosition = function(position) {
    var country = rgc.get_country(position.coords.latitude, position.coords.longitude);
    var $results = $('#results');

    $results.html( $results.html().replace("{{ country }}", country.name) );
    
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
