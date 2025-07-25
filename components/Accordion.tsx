"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
interface accordionprops{
  heading:string
  content:string
}

const Accordion = ({heading,content}:accordionprops) => {
  const [active, setActive] = useState(false);

  return (
    <div className="border-b border-gray-500 w-full py-2 h-auto ">
      <div className="flex items-center justify-between px-2">
        <h1 className="font-lg  text-left text-[20px] text-gray-900 py-2">
          {heading}
        </h1>
        {active ? (
          <span onClick={()=>setActive(curr=>!curr)}>
            <FiMinus></FiMinus>
          </span>
        ) : (
          <span onClick={()=>setActive(curr=>!curr)}>
            <FiPlus></FiPlus>
          </span>
        )}
      </div>
      <p className={` ${active?'block':'hidden'} text-gray-600 px-2`}>
        {content}
      </p>
    </div>
  );
};

export default Accordion;
