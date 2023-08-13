import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
// import { Icon } from 'leaflet'

import 'leaflet/dist/leaflet.css'

// const icon = new Icon({
//   iconUrl: '/images/map-marker.svg',
//   iconSize: [58, 68],
//   iconAnchor: [29, 68],
// })

interface Props {
  position: [number, number]
}

const Map: React.FC<Props> = ({ position }) => {
  return (
    <MapContainer center={position} zoom={13} className='border-2 z-10' scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* <Marker position={[6.601838, 3.351486]}>
        <Popup>A certain place</Popup>
      </Marker> */}
    </MapContainer>
  )
}

export default Map
