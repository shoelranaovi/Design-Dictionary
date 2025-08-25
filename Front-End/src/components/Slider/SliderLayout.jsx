import React from 'react'
import HeroSlider from './SliderOne'
import HeroSliderTwo from './SliderTwo'
import ExtraordinaryHeroSlider from './SLiderThree'

function SliderLayout() {
  return (
    <div>
        <div>
            <HeroSlider />
            <li></li>
            <li></li>
            <li></li>
            <HeroSliderTwo />

            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <ExtraordinaryHeroSlider />

 
        </div>

    </div>
  )
}

export default SliderLayout