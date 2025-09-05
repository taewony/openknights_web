import React from 'react';

interface PrizeCardProps {
    rank: string;
    award: string;
    teamCount: string;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ rank, award, teamCount }) => (
    <div className="bg-[#fef6e4] p-8 rounded-2xl text-center shadow-md border-2 border-[#f94f09]/50 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-[#f94f09]">{rank}</h3>
        <p className="text-4xl font-extrabold text-gray-800 my-4">{award}</p>
        <p className="text-gray-600 font-medium">{teamCount}</p>
    </div>
);

export default PrizeCard;