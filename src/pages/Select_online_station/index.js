import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import './index.css';

mapboxgl.accessToken = '';

class Application extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      lng: -60.673121878923098,
      lat: 2.830703812369549,
      zoom: 8.15
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(15),
        lat: map.getCenter().lat.toFixed(15),
        zoom: map.getZoom().toFixed(2)
      });
    });
		
		map.on('load', function() {
			map.addSource('national-park', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
					{
						'type': 'Feature',
						'geometry': {
							'type': 'Polygon',
							'coordinates': [
								[[-121.353637, 40.584978],
								[-121.284551, 40.584758],
								[-121.275349, 40.541646],
								[-121.246768, 40.541017],
								[-121.251343, 40.423383],
								[-121.32687, 40.423768],
								[-121.360619, 40.43479],
								[-121.363694, 40.409124],
								[-121.439713, 40.409197],
								[-121.439711, 40.423791],
								[-121.572133, 40.423548],
								[-121.577415, 40.550766],
								[-121.539486, 40.558107],
								[-121.520284, 40.572459],
								[-121.487219, 40.550822],
								[-121.446951, 40.56319],
								[-121.370644, 40.563267],
								[-121.353637, 40.584978]]
							]
						}
					},
					{
						'type': 'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [-60.5711, 3,2078]
						}
					},
					{
						'type': 'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [-121.505184, 40.488084]
						}
					},
					{
						'type': 'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [-121.354465, 40.488737]
						}
					}
					]
				}
			});
			 
			map.addLayer({
			'id': 'park-boundary',
			'type': 'fill',
			'source': 'national-park',
			'paint': {
			'fill-color': '#888888',
			'fill-opacity': 0.4
			},
			'filter': ['==', '$type', 'Polygon']
			});
			 
			map.addLayer({
			'id': 'park-volcanoes',
			'type': 'circle',
			'source': 'national-park',
			'paint': {
			'circle-radius': 6,
			'circle-color': '#B42222'
			},
			'filter': ['==', '$type', 'Point']
			});
		});		
  }

  render() {
    return (
      <div>
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}

export default Application;
