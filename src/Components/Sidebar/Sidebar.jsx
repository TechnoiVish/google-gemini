import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets';
import { Context } from '../../Context/Context';
const Sidebar = () => {

    const [menu,setMenu]= useState(true)
    const {onSent,prevPrompts,setRecentPrompt,newChat}= useContext(Context)

    const loadPrompt=async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

  return (
 <div className='sidebar'>
    <div className="top">
<img onClick={()=>setMenu(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
<div onClick={()=>newChat()} className="new-chat">
    <img src={assets.plus_icon} alt="" />
    {menu?<p>New Chat</p>:null}
</div>
{menu?
    <div className="recent">
    <p className="recent-title">Recent Activity</p>
    {prevPrompts.map((item,index)=>{
        return (
<div onClick={()=>loadPrompt(item)} className="recent-entry">
        <img src={assets.message_icon} alt="" />
        <p>{item.slice(0,10)}...</p>
    </div>
        )
    })}
    
</div>
:null


}

    </div>
    <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            <p>Help</p>

        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            <p>History</p>

        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            <p>Setting</p>

        </div>
    </div>
</div>
  )
}

export default Sidebar