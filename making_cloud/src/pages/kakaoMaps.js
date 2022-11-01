import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = () => {

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(37.0113489210134, 127.26392571237953),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
    }, []);
    return (
        <div id='myMap' style={{
            width: '700px', 
            height: '550px'
        }}></div>
    );
    
}

export default MapContainer; 