var mymap;

var lyrOSM;
var lyrTopo;
var lyrImagery;

var mrkCurrentLocation;
var lat;
var lng;

var ctlScale;
var ctlMouseposition;
var ctlSearch;
var ctlLayers;
var ctlDraw;

var fgpDrawnItems;

var objOverlays;
var objBasemaps;

var lastLat;
var lastLng;

$(document).ready(function () {
    mymap = L.map('mapdiv', { center: [19.4, -99.2], zoom: 13, attributionControl: false });
    lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    lyrTopo = L.tileLayer.provider('OpenTopoMap');
    lyrImagery = L.tileLayer.provider('Esri.WorldImagery');
                
    mymap.addLayer(lyrOSM);

    objBasemaps = {
        "Open Street Maps": lyrOSM,
        "Topo": lyrTopo,
        "Imagery": lyrImagery
    };

    fgpDrawnItems = new L.FeatureGroup();
    fgpDrawnItems.addTo(mymap);

    objOverlays = {
         "Drawn Items": fgpDrawnItems
    };

    ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(mymap);

    
    // ctlLayers = L.control.layers(objOverlays).addTo(mymap);

    ctlScale = L.control.scale({ position: 'bottomleft', imperial: false, maxWidth: 200, maxHeight: 100 }).addTo(mymap);
    ctlMouseposition = L.control.mousePosition().addTo(mymap);
    ctlSearch = L.Control.openCageSearch({ key: '3c38d15e76c02545181b07d3f8cfccf0', limit: 10 }).addTo(mymap);

    
   /* @foreach (var mapa in ViewBag.Actualizacion)
    {
        @:lastLat = @mapa.Latitud;
        @:lastLng = @mapa.Longitud;
        @:if (@mapa.Radio > 0) {
        @:    var circle = L.circle([@mapa.Latitud, @mapa.Longitud], {
        @:        color: 'red',
        @:        radius: @mapa.Radio
        @:    }).addTo(mymap);
        @:    circle.bindPopup("<p>@mapa.Accion</p>");
        @:} else {
        @:    var marker = L.marker([@mapa.Latitud, @mapa.Longitud]).addTo(mymap);
        @:    marker.bindPopup("<p>@mapa.Accion</p>").openPopup();
        @:}

    } */


// Manejar los eventos de dibujo
/*
    $("#Latitud"): This is a jQuery selector Este es un selector en jaquery. El simbolo # indica que esta seleccionando un elemento del HTML con un atributo id con el nombre "Latitud". Esto lo puedes identificar dentro del HTML con <input type="text" value="0" name="Latitud" id="Latitud" required>. 
    
    .val(...): Metodo del jQuery usado para establecer o agarrar un valor para los elementos de un formulario ( inputs, select boxes, etc.). En este caso establece un valor del seleccionado "Latitud" en el input field.

    
*/ 
    
    mymap.on('click', function (e) {
        lat = e.latlng.lat;
        lng = e.latlng.lng; 

        $("#Latitud").val(LatToArrayString(e.latlng));
        $("#Longitud").val(LngToArrayString(e.latlng));
        if (mrkCurrentLocation) {
            mymap.removeLayer(mrkCurrentLocation);
        }

        // Crea un nuevo marcador al momento de hacer click en el mapa y lo agrega al mapa.
        // Se le asigna la latitud y longitud del click al marcador.
        mrkCurrentLocation = L.marker([lat, lng]).addTo(mymap);

    })

    // Se establece la vista en el ultimo valor de latitud y longitud que se guardo en el HTML o en este caso en la BD que se implemente, para poder visualizar el evento más reciente.
    mymap.setView([lastLat, lastLng], 13);

   //Termina el jquery
});

// Estas funciones convierten la latitud y longitud a un string con 5 decimales.
// Esto es para que el valor de latitud y longitud se guarde en el input field del HTML y posteriormente a la BD.
function LatToArrayString(ll) {
    return ll.lat.toFixed(5);
}
function LngToArrayString(ll) {
    return ll.lng.toFixed(5);
}