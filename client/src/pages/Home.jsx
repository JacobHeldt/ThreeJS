import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { IoMdColorPalette } from "react-icons/IO"

import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion'

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro &&(
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img 
              src='./threejs.png'
              alt="logo"
              className='w-8 h-8 object-contain'
            />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text" style={{color: snap.color, filter: 'brightness(15%)'}}>
                BE <br className="x1:block hidden" /> BOLD.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className='max-w-md font-normal text-base' style={{color: snap.color, filter: 'brightness(15%)'}}>
              <strong>Unleash your style</strong> with our 3D tool. Create bold, unique tees that reflect your personality. Start designing today! 
              </p>

              <CustomButton 
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font=bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home