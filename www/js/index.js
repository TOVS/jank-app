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
    
    // De jankdatabase is een lijst met alle jankmomenten.
    // de `for loop` stelt ons in staat om voor elk jankmoment een actie uit de voeren.
    for (var i = 0; i < jankdatabase.length; i++) {
        // wat nu volgt wordt gedaan voor elk element uit de jankdatabase
        // en gebruikt elke keer de tijdelijke variabele ‘jankmoment’
        // om dit specifieke jankmoment te beschrijven
        var jankmoment = jankdatabase[i];
      
        // We weten van de jankmomenten de lengte- en breedte-graad,
        // en we weten onze huidige positie. We kunnen dus onze afstand berekenen
        // Als je de afstand tussen twee geografische punten wilt bereken moet je
        // in je berekening normaal gesproken reken houden met oa de bolling van
        // de aarde.
        // Omdat het hier over korte afstanden gaat is dat niet nodig,
        // en kunnen we gewoon de formule van Pythagoras gebruiken zoals je die op
        // school geleerd hebt.
        // Math.sqrt is de manier in Javascript om te worteltrekken
        var verschilLengte = longitude - jankmoment.lengte;
        var verschilBreedte =  latitude - jankmoment.breedte;
        var afstand = Math.sqrt( verschilLengte * verschilLengte + verschilBreedte * verschilBreedte );
      
        // De berekende afstand slaan we terug op in het jankmoment
        jankmoment.afstand = afstand;
    }
    
    // Nu gaan we de jankdatabase sorteren op de afstand die we net berekend hebben.
    // Elke lijst in JavaScript heeft een `sort` functie die in staat stelt de lijst te sorteren.
    // Normaal gebuurt dat alfabetisch, als we dat anders willen moeten we een functie
    // meesturen die aangeeft hoe we sorteren.
    jankdatabase.sort(function(a, b) {
      return a.afstand - b.afstand;
    })
    
    // De volgende lijn kun je gebruiken als je jankdatabase wilt checken in de console:
    // console.log(JSON.stringify(jankdatabase, null, 2));
    
    // Nu is het eerste jankmoment in de jankdatabase dus het meest dichtbij:
    var dichtbijJankmoment = jankdatabase[0];
    
    if (dichtbijJankmoment.afstand > 0.00002) {
        // De afstand is te groot! Je kunt het bovenstaande getal veranderen om de max. afstand te bepalen
        document.getElementById('reden').innerHTML = "Niet binnen bereik";
        document.getElementById('tijd').innerHTML = "Gebruik deze app op de Koninklijke Academie van Beeldende Kunsten, Den Haag";
    } else {
        document.getElementById('reden').innerHTML = dichtbijJankmoment.reden;
        document.getElementById('tijd').innerHTML = dichtbijJankmoment.tijd;
        document.getElementById('locatie').innerHTML = dichtbijJankmoment.locatie;
        // document.getElementById('naam').innerHTML = dichtbijJankmoment.Naam + " huilt:";
    }
    
    
};

var onError = function(error) {
    // this code is run if the app fails in finding out where we are
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

var initialize = function() {
    whereAreWe();
};
