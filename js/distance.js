
        var source, destination;
        var darection = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        google.maps.event.addDomListener(window, 'load', function () {
            new google.maps.places.SearchBox(document.getElementById('source'));
            new google.maps.places.SearchBox(document.getElementById('destination'));

        });

        function get_rout() {


            var mapOptions = {
                mapTypeControl: false,
                center: {lat: -33.8688, lng: 151.2195},
                zoom: 13
            };

            map = new google.maps.Map(document.getElementById('maplocation'), mapOptions);
            darection.setMap(map);
            darection.setPanel(document.getElementById('panallocation'));


            source = document.getElementById("source").value;
            destination = document.getElementById("destination").value;

            var request = {
                origin: 'Ranchi, Jharkhand, India',
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    darection.setDirections(response);
                }
            });



            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [source],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function (response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                    var distance = response.rows[0].elements[0].distance.text;
                    var duration = response.rows[0].elements[0].duration.text;

                    distancefinel = distance.split(" ");
                    $('.distance').val(distancefinel[0]);



                } else {
                    alert("Unable to find the distance via road.");
                }
            });
        }
