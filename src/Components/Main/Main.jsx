import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../Context/Context'
const Main = () => {
    

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
         <p>Google Gemini 2.0</p>
         <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult
            ?<>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest best places.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Best movies of the year.</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>How to do Workout.</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summerize the concept of ammonia.</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            
            </>
             :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p  dangerouslySetInnerHTML={{ __html: resultData }}></p>      

                    
                    }
              
                </div>
            </div>
            }
           
            <div className="main-bottom">
                <div className="search-box">
                    <input id='text' onChange={(e)=>setInput(e.target.value)} value={input} type="text " placeholder='Enter Prompt Here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <div className="bottom-info"> nam ipsa repellat fugiat ad, iure veniam inventore. repellat fugiat ad, iure veniam invent.
                    
                </div>
            </div>
        </div>
    </div>
  )

}

export default Main