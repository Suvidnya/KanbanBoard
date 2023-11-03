import React, { useState } from 'react';
import './card.css'
import profile from "../images/user.png";
import In from '../images/inprogress.png';
import Ba from '../images/backlog.png'
import To from '../images/todo.png';
import Do from '../images/done.png';
import Ca from '../images/canceled.png';


export const Card = ({id,title,tag,status}) => {

  let prog = null;
  const temp = status.substring(0,2);
  if(temp == "In") prog = In;
  if(temp == "Ba") prog = Ba;
  if(temp == "To") prog = To;
  if(temp == "Do") prog = Do;
  if(temp == "Ca") prog = Ca;
  return (

    <div className="card">
    <div className="cardheader">
        <span className="text">{id}</span>
        
        <div className="account-image">
            <img src={profile} alt="Account Image"/>
        </div>
    </div>
    <p className='tasktitle'>
     {title}
  </p>
    
    <div className="footer">
    <img className="prog" src={prog} alt="Prog" />
        <div className="bottom-left-box">
        <ul className='no-bullet'>
        {tag.map((item, index) => (
          <li key={index}><span className="bottom-text">{item}</span></li>
        ))}
        </ul>
        </div>
    </div>
</div>

  )
}
