import { proxy } from 'valtio';

const state = proxy ({
    intro: true,
    color: '#68E6CF',
    secolor: '0C1A17',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png'
})

export default state;