import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const Map = React.memo(({ origin, destination }) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (origin && destination) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            }, (result, status) => {
                if (status === 'OK') {
                    setResponse(result);
                } else {
                    console.error('Directions request failed due to ' + status);
                }
            });
        }
    }, [origin, destination]);
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 17.6868, lng: 83.2185 }}
            zoom={10}
            options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,

            }}
        >
            {response && <DirectionsRenderer directions={response} />}
        </GoogleMap>
    );
});

export default Map;
