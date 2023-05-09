import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker 
        color={snap.color}
        disableAlpha
        presetColors={[
          "#68E6CF",
          "#9168E6",
          "#E6687F",
          "#E6E068",
          "#85E668",
          "#E6F2F0",

          "#2E665B",
          "#402E66",
          "#662E38",
          "#665D2E",
          "#3B662E",
          "#303333",
        ]}
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker