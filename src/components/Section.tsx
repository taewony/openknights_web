import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = 'bg-white' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;