import React from 'react';
import RankingPage from '../../components/RankingPage';

interface User {
  rank: number;
  id: string;
  solved: number;
  submitted: number;
  accuracy: number;
}

interface CategoryRankingProps {
  category: string;
  rankings: User[];
}

const CategoryRanking: React.FC<CategoryRankingProps> = ({ category, rankings = [] }) => {
  return <RankingPage category={category} rankings={rankings} />;
};

export async function getServerSideProps(context) {
  const { category } = context.params;
  // rankings 데이터를 서버에서 가져오는 로직을 추가하세요
  const rankings: User[] = await fetchRankings(category);

  return {
    props: {
      category,
      rankings,
    },
  };
}

export default CategoryRanking;