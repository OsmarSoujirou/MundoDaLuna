import React from 'react';
import './Style.css';

function Card({title, text, pts, type, id, activated}) {

  return (
    <div className={"card card_" + type + " " + activated} style={{ backgroundImage: "url(./Assets/card" + type + ".png)" }} >
     <div className="div_pts">{pts}pt</div>
     <div className="icon" style={{ backgroundImage: "url(./Assets/icon_" + id + ".png)" }}/>
     <div className="div_title">{title}</div>
     <div className="div_text">{text}</div>
    </div>
  );
}

export default Card;
