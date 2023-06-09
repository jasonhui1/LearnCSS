import React, { useState, useEffect, useRef } from 'react'
import { overrideTailwindClasses } from 'tailwind-override'


export function Radio({ val, handleClick, active = false }) {
  const classN = 'btn capitalize  border border-red-200 rounded-3xl ' + (active && 'btn-success')

  return (
    <>
      <label className={classN}>{val}
        <input className="btn hidden capitalize " type="radio" value={val} name={val} onClick={handleClick} />
      </label>
    </>
  )
}

//prepend to keep the same value different (for NthChild)
export function PropertyRadioComponents({ properties, handleClassName, currentExample = [], prepend = '' }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const lastActiveIndex = useRef(-1)

  useEffect(() => {
    if (lastActiveIndex.current >= 0) handleClassName(properties[lastActiveIndex.current])
    if (activeIndex >= 0) handleClassName(properties[activeIndex])

    lastActiveIndex.current = activeIndex

  }, [activeIndex])

  useEffect(() => {
    const intersectProperty = properties.filter(value => currentExample.includes(prepend + value));

    //Example does contain any class name for the radio components
    if (intersectProperty.length === 0) {
      reset()
      return
    }
    const index = properties.findIndex(name => name === intersectProperty[0])
    if (index !== activeIndex) {
      setActiveIndex(index)
    }

  }, [currentExample])


  const handleClick = (new_index) => {
    //Turn off
    if (new_index !== activeIndex) {
      setActiveIndex(new_index)
    } else {
      reset()
    }
  }

  const reset = () => {
    if (activeIndex >= 0) setActiveIndex(-1)
  }


  return (
  <div className='flex flex-wrap gap-4 justify-start'>
    {properties.map((property, i) => {
      return <Radio key={i} handleClick={() => handleClick(i)} val={property} active={i === activeIndex}  />
    })}
    <button key='reset-btn' className={('btn btn-warning ml-auto mr-6')} onClick={reset}>Reset</button>

  </div>);
}

