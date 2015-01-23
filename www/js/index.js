var whereAreWe = function() {
    // Ask the device for the current position;
    // When we find it run the function ‘updatePosition’ (a ‘callback’)
    navigator.geolocation.getCurrentPosition(updatePosition, onError);
};

	// positie device opvragen
var updatePosition = function(position) {
    var $results = $('#results');
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    $results.html( latitude + ", " + longitude  );
    
    // loadscreen hidden maken en content visible maken
    $("#loading").addClass("hidden");
    $("#oog").removeClass("hidden");
    $("#container").removeClass("hidden");
    
    // ik weet niet wat dit doet
    for (var i = 0; i < jankdatabase.length; i++) {
	    var jankmoment = jankdatabase[i];
	    console.log(jankmoment.reden);
    }
    
    
    // Op dit moment wordt alleen object 3 uit de JSON gehaald en is er niks op basis van coords
    document.getElementById('reden').innerHTML = jankdatabase[3].reden;    
    document.getElementById('tijd').innerHTML = jankdatabase[3].tijd;
    document.getElementById('locatie').innerHTML = jankdatabase[3].locatie;
    
    // document.getElementById('naam').innerHTML = jankdatabase[3].Naam + " huilt:";

    
    
};


var onError = function(error) {
    // this code is run if the app fails in finding out where we are
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

var initialize = function() {
    whereAreWe();
};
