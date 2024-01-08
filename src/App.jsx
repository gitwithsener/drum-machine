import { useEffect, useState } from 'react'
import './App.css'

const drumAudio = [
  {
    keyCode: 81,
    text: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyCode: 87,
    text: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyCode: 69,
    text: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyCode: 65,
    text: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyCode: 83,
    text: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyCode: 68,
    text: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open HH",
  },
  {
    keyCode: 90,
    text: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick n' Hat",
  },
  {
    keyCode: 88,
    text: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyCode: 67,
    text: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed HH",
  }
];

function App() {
  const [playSound, setPlaySound] = useState('');
  const [volume, setVolume] = useState(0.86);
  const [innerOn, setInnerOn] = useState(false);
  const [bankOn, setBankOn] = useState(false);
  const [keyOn, setKeyOn] = useState(null);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      drumPadPlay(event.key.toUpperCase());
    });
  }, []);

  function drumPadPlay(key) {
    const drumPad = drumAudio.find(pad => pad.text === key);
    if (drumPad) {
      const drum = document.getElementById(drumPad.text);
      drum.volume = volume;
      drum.play();
      setPlaySound(drumPad.description);
    }
  }

  function volumeChange(event)  {
    setVolume(event.target.value);
  }

  const toggleInner = () => {
    setInnerOn(!innerOn);
  }

  const toggleBank = () => {
    setBankOn(!bankOn);
  }

  const toggleKey = (padID) => {
    setKeyOn(padID);
  }

  const transitionStyle = {
    transition: "all 5s ease",
    WebkitTransition: "all 5s ease",
    MozTransition: "all 5s ease",
};

  return (
    <>
      <div id='drum-machine' className='drumMachine'>
        <div className='drum-pads'>
          {drumAudio.map((pad) => (
            <div className='drum-pad' id={pad.description} key={pad.url}
            onClick={() => {
              drumPadPlay(pad.text);
              toggleKey(pad.description)
            }} style={{ backgroundColor: keyOn === pad.description ? 'coral' : ''}}
            >
              {pad.text}
              <audio className='clip'
              id={pad.text} src={pad.url}></audio>
            </div>
          ))}
        </div>
        <div className='control-container'>
          <div className='control'>
            <p>Power</p>
            <div className='select' onClick={toggleInner}>
              <div className='inner' style={{ float: innerOn ? 'right' : 'left' }}></div>
            </div>
          </div>
          <div className='control'>
          <p>Bank</p>
            <div className='select' onClick={toggleBank}>
              <div className='inner' style={{ float: bankOn ? 'right' : 'left'}}></div>
            </div>
          </div>
          <div id='display'>{playSound}
          </div>
          <div className='volume'>
            <input max={1} min={0} step={0.01} type='range' value={volume} onChange={volumeChange}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
