jQuery(document).ready(function($){
	var c_mapElement = document.getElementById('map_container');
	if(c_mapElement){
		var c_mapLatLng = new google.maps.LatLng(58.0003748, 56.247142);
		var c_mapOptions = {
			zoom: 14,
			center: c_mapLatLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			//zoomControl: false,
			streetViewControl: false,
			scrollwheel: false,
			//disableDoubleClickZoom: true,
			mapTypeControlOptions: {
				mapTypeIds: []
			}
		};
		var c_map = new google.maps.Map(c_mapElement, c_mapOptions);

		var c_marker = new google.maps.Marker({
			position: c_mapLatLng,
			map: c_map,
			title: 'UVER, главный офис'
		});
	}
});