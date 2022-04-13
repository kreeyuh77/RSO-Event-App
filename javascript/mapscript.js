$(function() {
 
$('#us2').locationpicker({
   location: {latitude: 28.6024274, longitude: -81.2000599},   
   radius: 0,
   inputBinding: {
      latitudeInput: $('#lat'),
      longitudeInput: $('#lng'),
      locationNameInput: $('#location')
   },
   enableAutocomplete: true,
   // onchanged: function(currentLocation, radius, isMarkerDropped) {
   //    alert("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude + ")");
   //  }
});
 
 
});
