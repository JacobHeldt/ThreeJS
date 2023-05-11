import React, {useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { IconsColors, hexToRgb, getContrastingColor, darkenHexColor } from '../config/helpers';

import { MdOutlineColorLens } from 'react-icons/md'
import { MdOutlineImage } from 'react-icons/md'

import config from '../config/config'
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState('');

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // Show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker 
          file={file}
          setFile={setFile}
          rea dFile={readFile}
        />
      default: 
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {

    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch(tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    // After setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result)
        setActiveEditorTab("")
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >

          {/* <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100vh',
          width: '95vw',
            position: 'absolute',
            color: darkenHexColor(snap.color, 50)
          }}> */}
            {/* <h1 style={{ fontSize: '20px', width: '350px', textAlign: 'center', fontStyle: 'italic', fontWeight: 500 }}>Don't settle for boring - unleash your creativity and design unique and bold t-shirts.</h1> */}
          {/* </div> */}

            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs" style={{ background: `rgba(${hexToRgb(snap.color)}, 0.1)` }}>
                <MdOutlineColorLens style={{color: snap.color, filter: IconsColors(snap.color)}} fontSize='50px' onClick={() => {setActiveEditorTab('colorpicker'); console.log(IconsColors(snap.color))}}/>
                <MdOutlineImage style={{color: snap.color, filter: IconsColors(snap.color)}} fontSize='50px' onClick={() => {setActiveEditorTab('filepicker'); console.log(IconsColors(snap.color))}}/>
                {generateTabContent()}
              </div>
            </div>

          </motion.div>

          <motion.div
            className="absolute z-10 top-5 left-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab 
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer