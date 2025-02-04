import React from 'react';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import Video from './Video';

const MainContainer = styled('div')({
  height: '85%',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
});

const VideosContainer = () => {
  const { screenSharingStream, remoteStreams, localStream } = useSelector(
    (state) => state.room
  );
  console.log('1',screenSharingStream, '2',remoteStreams,'3', localStream)
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  );
};
export default VideosContainer;

