import React from 'react';
import OrganismHeader from '../organisms/OrganismHeader';
import MoleculeSearchBar from '../molecules/MoleculeSearchBar';
import OrganismCardList from '../organisms/OrganismCardList';
import VisualH3 from '../atoms/VisualH3';
import sampleImage from '../../assets/images/sampleImage.jpg'; // 샘플 이미지 경로

const TemplateMain = () => {
  const items = [
    {
      img: sampleImage,
      title: '1번',
    },
    {
      img: sampleImage,
      title: '2번',
    },
    {
      img: sampleImage,
      title: '3번',
    },
    {
      img: sampleImage,
      title: '4번',
    },
    {
      img: sampleImage,
      title: '5번',
    },
    {
      img: sampleImage,
      title: '6번',
    },
    {
      img: sampleImage,
      title: '7번',
    },
    {
      img: sampleImage,
      title: '8번',
    },
  ];

  return (
    <div>
      <OrganismHeader />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <VisualH3>123,456명의 AI 패널 대기 중</VisualH3>
        <MoleculeSearchBar />
      </div>
      <OrganismCardList items={items} />
    </div>
  );
};

export default TemplateMain;
