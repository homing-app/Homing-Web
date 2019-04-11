import React from 'react';
import { Icon, Whisper,Popover,IconButton } from 'rsuite';
import '../../style/Room.css'



const Room = (props) => {

  const changeToClean = () => {
    props.cleanRoom(props._id, "clean")
  }
  const changeToMedium = () => {
    props.cleanRoom(props._id, "medium")
  }
  const changeToDirty = () => {
    props.cleanRoom(props._id, "dirty")
  }

  const getIconName = (name) => {
    switch(name) {
      case 'Dormitorio': 
        return 'digg'
      case 'Baño':
        return 'edge'
      default: return 'cube'
    }
  }

  const speaker = (
    <Popover className="roomPopover" title="State">
    <IconButton onClick={changeToDirty} size="lg" icon={<Icon icon="thumbs-o-down" />} color="red" circle />
    <IconButton onClick={changeToMedium} size="lg" icon={<Icon icon="hand-stop-o" />} color="yellow" circle />
    <IconButton onClick={changeToClean} size="lg" icon={<Icon icon="thumbs-o-up" />} color="green" circle />
    </Popover>
  );

  return (
    <Whisper placement="auto" trigger="click" speaker={speaker}>
    <div className="roomDiv">
      <div className={`box ${props.state}`}>
        <Icon size="2x" icon={getIconName(props.name)}/>
      </div>
    <p>{props.name}</p>
  </div>
</Whisper>
  )
};

export default Room;