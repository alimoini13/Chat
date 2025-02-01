import React from 'react'
import { styled } from '@mui/system';

const MessageInnerContent = styled('div')({
    color: '#DCDDDE',
  });
  
export const MessageContent = ({content}) => {
    console.log('content',content)
    const isCloudinaryImage = content.startsWith('https://res.cloudinary.com');
  return (
    <div>
    {isCloudinaryImage ? (
      // اگر content یک لینک Cloudinary است، از تگ <img> استفاده می‌کنیم
      <img
        src={content}
        alt="Uploaded content"
        style={{ maxWidth: '250px', borderRadius: '8px' }}
      />
    ) : (
      // در غیر این صورت، متن را نمایش می‌دهیم
      <MessageInnerContent>
        {content}
      </MessageInnerContent>
    )}
  </div>
  )
}
