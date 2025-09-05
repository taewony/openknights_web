import React from 'react';

interface TimelineItemProps {
    date: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, isLast = false }) => (
    <div className="flex items-start">
        <div className="flex flex-col items-center mr-6">
            <div className="w-5 h-5 bg-[#f94f09] rounded-full z-10"></div>
            {!isLast && <div className="w-0.5 h-32 bg-gray-300"></div>}
        </div>
        <div className="pb-8">
            <p className="text-sm text-gray-500 mb-1">{date}</p>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    </div>
);

export default TimelineItem;