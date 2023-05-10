import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'
import { getContrastingColor, darkenHexColor } from '../config/helpers';

const CustomButton = ({type, title, customStyles, handleClick}) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if(type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if(type === "outline") {
            return {
                borderWidth: '1px',
                borderColor:  darkenHexColor(snap.color, 50),
                color: darkenHexColor(snap.color, 50),
            }
        }
    }
    return (
        <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>
            {title}
        </button>
    )
}

export default CustomButton