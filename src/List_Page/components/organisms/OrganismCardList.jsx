import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import sampleImage from '../../assets/images/sampleImage.jpg'; // 샘플 이미지 경로
import '../../assets/styles/molecules_css/Pagination.css'; // CSS 파일을 import

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const Card = styled.div`
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  padding: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardTitle = styled.h4`
  margin-top: 10px;
  font-size: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const OrganismCardList = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <CardContainer>
        {currentItems.map((item, index) => (
          <Card key={index}>
            <CardImage src={item.img} alt={item.title} />
            <CardTitle>{item.title}</CardTitle>
          </Card>
        ))}
      </CardContainer>
      <PaginationContainer>
        <ReactPaginate
          previousLabel={'«'}
          nextLabel={'»'}
          breakLabel={'...'}
          pageCount={Math.ceil(items.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
        />
      </PaginationContainer>
    </div>
  );
};

export default OrganismCardList;
