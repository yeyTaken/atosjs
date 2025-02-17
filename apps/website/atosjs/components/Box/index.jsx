"use client";

import { useState } from 'react'
import cn from 'clsx'
import { 
  FaInfoCircle, 
  FaTimesCircle, 
  FaExclamationTriangle, 
  FaLightbulb, 
  FaChevronDown, 
  FaChevronUp
} from 'react-icons/fa'

const TypeToEmoji = {
  default: <FaLightbulb size={20} className="x:mt-1" />,
  error: <FaTimesCircle size={20} className="x:mt-1" />,
  info: <FaInfoCircle size={20} className="x:mt-1" />,
  warning: <FaExclamationTriangle size={20} className="x:mt-1" />
}

const classes = {
  default: cn(
    'x:border-orange-100 x:bg-orange-50/70 x:text-orange-800 x:dark:border-orange-400/30 x:dark:bg-orange-400/20 x:dark:text-orange-300'
  ),
  error: cn(
    'x:border-red-200 x:bg-red-100/70 x:text-red-900 x:dark:border-red-200/30 x:dark:bg-red-900/30 x:dark:text-red-200'
  ),
  info: cn(
    'x:border-blue-200 x:bg-blue-100/70 x:text-blue-900 x:dark:border-blue-200/30 x:dark:bg-blue-900/30 x:dark:text-blue-200'
  ),
  warning: cn(
    'x:border-yellow-100 x:bg-yellow-50/70 x:text-yellow-900 x:dark:border-yellow-200/30 x:dark:bg-yellow-700/30 x:dark:text-yellow-200'
  )
}

export const Box = ({ children, type = 'default', emoji, isDropDown = false, BoxTitle = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const icon = emoji || TypeToEmoji[type]

  const toggleDropDown = () => setIsOpen(prev => !prev)

  return (
    <div
      className={cn(
        'nextra-callout x:overflow-x-auto x:mt-6 x:flex x:rounded-lg x:border x:py-2 x:pe-4',
        'x:contrast-more:border-current!',
        classes[type]
      )}
    >
      <div
        className="x:select-none x:text-xl x:ps-3 x:pe-2"
        style={{
          fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
        }}
        data-pagefind-ignore="all"
      >
        {icon}
      </div>
      <div className="x:w-full x:min-w-0 x:leading-7">
        <div className="x:flex x:items-center x:justify-between">
          <div className="x:flex x:items-center">
            {BoxTitle && <span className="x:text-xl x:font-semibold x:ms-2">{BoxTitle}</span>}
          </div>
          {isDropDown && (
            <div 
              className="x:cursor-pointer x:text-xl"
              onClick={toggleDropDown}
            >
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          )}
        </div>
        {(!isDropDown || isOpen) && <div>{children}</div>}
      </div>
    </div>
  )
}