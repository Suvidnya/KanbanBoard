import React from 'react';
import './list.css';
import { Card } from '../card/card';
import logo from '../images/user.png';
import plus from '../images/plus.png';
import cont from '../images/continue.png';


export const List = ({icon ,heading, tickets}) => {

  let content1;
  let content2;
  let content3;

  if (heading != null) {
    content1 = <img src={icon} alt="Icon" width="15" height="15" />;
  } 
  if (heading != null) {
    content2 = <img className="right" src={plus} alt="Icon" width="13" height="13" />;
  } 
  if (heading != null) {
    content3 = <img className="cont" src={cont} alt="Icon" width="13" height="13" />;
  } 

  return (
    <div className='listcol'>
    <div className="heading-container">
    
    {content1}
    <p className="heading">{heading}</p>
    {content2}{content3}
  </div>
    <div className="listofcards">
      <ul className='no-bullet'>
      {tickets.map((ticket, index) => (
            <li key={index}>{<Card id={ticket.id} title={ticket.title} tag={ticket.tag} status={ticket.status}/>}</li>
          ))}
      </ul>
    </div>

    </div>
  )
}
