import React from 'react';

interface Props {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ total, current, onChange }) => {
  const pages = Array.from({ length: Math.ceil(total / 2) }).map((_, i) => i + 1);

  return (
    <div className="flex space-x-2 mt-8">
      {pages.map(page => (
        <button
          key={page}
          className={`px-4 py-2 ${page === current ? 'bg-Blue text-white' : 'bg-gray-200'}`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
