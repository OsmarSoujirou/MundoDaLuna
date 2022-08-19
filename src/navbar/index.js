import React, {useState, useEffect} from 'react';
import './Style.css';
import useSound from 'use-sound';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [playOn] = useSound('/Assets/pop-on.mp3', { volume: 0.1 });
  const [playOff] = useSound('/Assets/pop-off.mp3', { volume: 0.1 });
  const [play, { stop }] = useSound('/Assets/DancingStar.mp3', {
    volume: 0.1,
  });
  const [isPlay, setIsPlay] = useState(false);

  const altPlay = () => {
    if (!isPlay) {
      play();
    } else {
      stop();
    }
    setIsPlay(!isPlay);
  };
  useEffect(() => {
    
    return () => {
      stop();
      setIsChecked({})
      setIsPlay({});
    };
  }, []);
  const menuOnClick = () => {
    isChecked ? playOn() : playOff();
    setIsChecked(!isChecked);
    document.getElementById('menu-bar').classList.toggle('change');
    document.getElementById('nav').classList.toggle('change');
    document.getElementById('menu-bg').classList.toggle('change-bg');
  };
  return (
    <>
      <div id="menu">
        <div id="menu-bar" onClick={menuOnClick}>
          <div id="bar1" className="bar"></div>
          <div id="bar2" className="bar"></div>
          <div id="bar3" className="bar"></div>
        </div>
        <nav className="nav" id="nav">
          <ul>
            <li>
              <Link to="/" onClick={() => menuOnClick()}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/mural" onClick={() => menuOnClick()}>
                Mural
              </Link>
            </li>
            <li>
              <Link to="/score" onClick={() => menuOnClick()}>
                Score
              </Link>
            </li>
          </ul>
        </nav>
        <div id="control" className={!isPlay ? '' : 'is--playing'} onClick={() => altPlay()}>
          <div className="border"></div>
          <div className="play"></div>
        </div>
      </div>

      <div className="menu-bg" id="menu-bg"></div>
    </>
  );
};

export default Navbar;
