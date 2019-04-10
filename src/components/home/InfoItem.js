import React from 'react';

const InfoItem = (props) => (
  <div>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </div>
);

export default InfoItem;