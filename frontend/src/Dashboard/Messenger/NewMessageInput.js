import React, { useRef,useState } from 'react';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { sendDirectMessage } from '../../realTimeCommunication/socketConnection';
import { Box, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { uploadFileHandler } from '../../api';
import { openAlertMessage } from '../../features/alert/alertSlice';


const MainContainer = styled('div')({
  height: '60px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Input = styled('input')({
  backgroundColor: '#2f3136',
  width: '98%',
  height: '44px',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  padding: '0 10px',
  flex:1
});

const InputContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px', // Space between input and buttons
  backgroundColor: '#2f3136',
  borderRadius: '8px',
  padding: '0 10px',
  width: '100%',
});

const NewMessageInput = () => {
  const hiddenFileInput = useRef(null);
  const { chosenChatDetails } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
const dispatch = useDispatch();
  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };




  const handleSendMessage = async () => {
    if (message.length > 0) {
      console.log('send message');
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage('');
    }
    if(file){
      try{
      dispatch(openAlertMessage('Wait for upload'));
      const res=await uploadFileHandler(file)
      console.log('res uploadFileHandler',res)
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: res.data.secure_url,
      });
      setFile('')}catch(err){
        console.log('upload err',err)
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0] && e.target.files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log(file)
  };
  const handleAttach = () => {
    hiddenFileInput.current.click();
    console.log('Attach button clicked');
    
    // Add your file attachment logic here
  };
 
  return (
    <MainContainer>
       <InputContainer>
    
       
         <div>
           <input type="file"   onChange={handleFileChange} ref={hiddenFileInput} hidden/>
           <IconButton sx={{ color: 'white' }} onClick={handleAttach}>
             <AttachFileIcon />
           </IconButton>
         </div>
         {file && (
        <img
          src={imageSrc}
          alt="attachment"
          style={{ width: '40px', height: '40px', borderRadius: '4px' }}
        />
      )}
      
      <Input
        placeholder={`Write message to ${chosenChatDetails.name}
           `}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
      <IconButton sx={{ color: 'white' }} onClick={handleSendMessage}>
  <SendIcon />
</IconButton>
      </InputContainer>
    </MainContainer>
  );
};

export default NewMessageInput;
