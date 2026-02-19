import React, { useEffect, useState } from 'react'
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import MarkerItem from './MarkerItem';

function MapSection({ coordinates, listing }) {
    const [viewState, setViewState] = useState({
        longitude: 73.27,
        latitude: 32.35,
        zoom: 15
    })

    useEffect(() => {
        if (coordinates) {
            setViewState((prev) => ({
                ...prev,
                longitude: coordinates.lon,
                latitude: coordinates.lat
            }))
        }
    }, [coordinates])

    return (
        <div>
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '75vh' }}
                mapStyle={`https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_AUTOCOMPLETE_KEY}`}
            >
                {listing.map((item, index)=>(
                    <MarkerItem key={index} item={item}/>
                ))}
            </Map>

        </div>
    )
}

export default MapSection