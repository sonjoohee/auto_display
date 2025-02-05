import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PageBlog = () => {
  return (
    <BlogContainer>
      <iframe 
        src="https://www.notioniframe.com/notion/1mevbyj6h8z" 
        title="Blog Content"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          padding: 0
        }}
      />
    </BlogContainer>
  );
};

export default PageBlog;

const BlogContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`;

const BlogPost = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
`;
