import React, { useContext, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const [prevTranscript, setPrevTranscript] = useState(''); // To store previous transcript
    const [myfile, setMyfile] = useState(null); // State to store the selected file

    useEffect(() => {
        if (transcript && transcript !== prevTranscript) {
            const newTranscript = transcript.replace(prevTranscript, '').trim(); // Get only the new part of the transcript
            setInput(prevInput => prevInput + ' ' + newTranscript);  // Append only the new part to the input
            setPrevTranscript(transcript); // Update the previous transcript

            const resetTimeout = setTimeout(() => {
                resetTranscript();
            }, 1000); // 1 second delay before resetting

            return () => clearTimeout(resetTimeout); // Clean up timeout on component unmount
        }
    }, [transcript, prevTranscript, setInput, resetTranscript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const openGallery = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click(); // Simulates a click on the hidden file input
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (input.trim()) {  // Make sure the input is not just empty spaces
                onSent(); // Trigger sending the input when Enter key is pressed
                e.preventDefault();
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMyfile(file); // Update the file state when a file is selected
        console.log(file); // You can now work with the selected file
    };

    const handleCardClick = (event) => {
        const pText = event.currentTarget.querySelector('p').textContent;
        setInput(pText);
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Google Gemini 2.0</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How Can I Help You Today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={handleCardClick}>
                                <p>Suggest best places for travelling.</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={handleCardClick}>
                                <p>Describe some law's given by newton.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={handleCardClick}>
                                <p>Help me plan for a 5Km run, I have 1 month to train.</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={handleCardClick}>
                                <p>Settle a debate: Web development, Machine Learning, or Data Analyst.</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box" style={{ display: "flex", flexDirection: "column" }}>
                        {/* Always render the file input, but hide it */}
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Keep it hidden
                        />
                        
                        <div>
                            <input
                                id='text'
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                type="text"
                                placeholder='Enter Prompt Here'
                                onKeyDown={handleKeyDown}
                            />
                        <div>
                            <img src={assets.gallery_icon} alt="" onClick={openGallery} />
                            <img src={assets.mic_icon} alt="" onClick={SpeechRecognition.startListening} />
                            {input && <img onClick={onSent} src={assets.send_icon} alt="" />}
                        </div>
                        </div>
                    </div>
                    <div className="bottom-info">
                        Gemini 2.0 a powerful artificial intelligence (AI) model from Google.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
