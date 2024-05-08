import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function PlacesAutoComplete({ label, placeholder, onSelect }) {
    const [address, setAddress] = React.useState('');

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        onSelect({ address: value, latLng });
    };

    return (
        <div style={{ position: 'relative' }}>
            <label>{label}</label>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div style={{ position: 'relative' }}>
                        <input {...getInputProps({ placeholder })} />
                        <div style={{ position: 'absolute', zIndex: 100, top: '100%', left: 0, right: 0, maxHeight: '200px', overflowY: 'scroll', borderRadius: '4px', marginTop: '4px' }}>
                            {loading ? <div>Loading...</div> : null}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                    padding: '8px',
                                    borderBottom: '1px solid #ccc',
                                    cursor: 'pointer',
                                };
                                return (
                                    <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
                }
            </PlacesAutocomplete >
        </div >
    );
}

export default PlacesAutoComplete;
