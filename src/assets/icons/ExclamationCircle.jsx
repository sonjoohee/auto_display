import React from 'react';
import { palette } from '../../assets/styles/Palette';

const ExclamationCircle = ({ width = "20", height = "20", color = palette.gray500, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 20 20" 
      fill="none"
      {...props}
    >
      <path 
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.729 12.2828L10.871 6H9.11619L9.27103 12.2828H10.729ZM10.0065 13.0943C9.45166 13.1004 8.99362 13.5246 9.00007 14.041C8.99362 14.5697 9.45166 15 10.0065 15C10.542 15 11 14.5697 11 14.041C11 13.5246 10.542 13.1004 10.0065 13.0943Z" 
        fill={color}
      />
    </svg>
  );
};

export default ExclamationCircle; 