import React from 'react';
import {Whisper, Tooltip, Divider } from 'rsuite';
var moment = require('moment');

const DateItem = (props) => {

  const tooltip = (
    <Tooltip>
      <h3 style={{margin: 4}}>{props.name}</h3>
      <p style={{marginBottom: 4}}>at {moment(props.moment).format('hh:mm')}</p>
    </Tooltip>
  );

  return(
    <Whisper placement="top" trigger="click" speaker={tooltip}>
      <div className="date">
        <h2>{moment(props.moment).format('D')}</h2>
        
        <p>{moment(props.moment).format('MMMM')}</p>
      </div>
    </Whisper>
  )

  };

export default DateItem;