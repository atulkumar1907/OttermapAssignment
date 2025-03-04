// components/MapPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import { Zoom, Rotate } from "ol/control";
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Stroke, Fill } from 'ol/style';
import { Polygon } from 'ol/geom';
import { getArea } from 'ol/sphere';
import { Container, Button } from 'react-bootstrap';
import Header from './Header';
import Nav from './Nav';
import '../App.css'


function MapPage() {
  const location = useLocation();
  const { firstName } = location.state || {};
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [modify, setModify] = useState(null);
  const vectorSource = useRef(new VectorSource({ wrapX: false }));
  const vectorLayer = useRef(new VectorLayer({
    source: vectorSource.current,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2,
      }),
    }),
  }));
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer.current,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      // controls: [],
    }, []);
    
    setMap(initialMap);
    vectorSource.current.on('changefeature', () => {
      updatePolygons();
    });

    return () => initialMap.setTarget(undefined);
  }, []);

  const updatePolygons = () => {
    const features = vectorSource.current.getFeatures();
    const newPolygons = features.map((feature) => {
      const polygon = feature.getGeometry().getCoordinates()[0];
      const area = getArea(new Polygon(feature.getGeometry().getCoordinates()));
      return { coordinates: polygon, area: area.toFixed(2) };
    });
    setPolygons(newPolygons);
  };

  const handleDraw = () => {
    if (draw) {
      map.removeInteraction(draw);
    }
    if(modify){
      map.removeInteraction(modify);
    }
    const newDraw = new Draw({
      source: vectorSource.current,
      type: 'Polygon',
    });
    map.addInteraction(newDraw);
    setDraw(newDraw);

    newDraw.on('drawend', (event) => {
      updatePolygons();
      map.removeInteraction(newDraw);
      setDraw(null);
    });
  };

  const handleEdit = () => {
    if (modify) {
      map.removeInteraction(modify);
    }
    if (draw) {
      map.removeInteraction(draw);
    }
    const newModify = new Modify({
      source: vectorSource.current,
    });
    map.addInteraction(newModify);
    setModify(newModify);
  };

  const handleDelete = () => {
    vectorSource.current.clear();
    setPolygons([]);
    if(modify){
      map.removeInteraction(modify)
      setModify(null);
    }
    if(draw){
      map.removeInteraction(draw);
      setDraw(null);
    }
  };

  return (
    <>
      <Nav />
      <Container className='w-75 mb-5'>
        <Header>{firstName || 'Map'}</Header>
        <Container className='border rounded-5 overflow-hidden p-3'>
       
        <div ref={mapRef} className='border mx-auto rounded-5 overflow-hidden'  style={{ width: '75%', height: '400px'}}>
        
        </div>
       
        <div className='mt-3 d-flex flex-column justify-content-center align-items-center gap-3 flex-md-row gap-md-5'>
          <button className='btn-map border border-2 rounded-2 color-warning border-warning' onClick={handleDraw}>Draw </button>
          <button className='btn-map border border-2 rounded-2 color-warning border-warning' onClick={handleEdit}>Edit </button>
          <button className='btn-map border border-2 rounded-2 color-warning border-warning' onClick={handleDelete}>Delete </button>
        </div>
        <div>
          <h2>Polygons:</h2>
          <ul>
            {polygons.map((polygon, index) => (
              <li key={index}>
                Polygon {index + 1}: Area - {polygon.area} square meters.
              </li>
            ))}
          </ul>
        </div>
        </Container>
      </Container>
    </>
  );
}

export default MapPage;