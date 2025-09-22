'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';

interface LocationItem {
  name: string;
  link: string;
}

export function LocationBoard({
  locationBoardData,
}: {
  locationBoardData?: LocationItem[];
}) {
  const [data, setData] = useState<LocationItem[]>(locationBoardData || []);
  const { id } = useParams();

  useLayoutEffect(() => {
    if (locationBoardData) return;

    const pathName = window.location.pathname;
    const pathNameArr = pathName.split('/');

    // Remove ID from end of path if it exists
    if (id) pathNameArr.pop();

    const d: LocationItem[] = [];

    for (let i = 1; i < pathNameArr.length; i++) {
      const name = pathNameArr[i].split('-').join(' ');
      const link = i === pathNameArr.length - 1 ? '' : pathNameArr.slice(0, i + 1).join('/');
      d.push({ name, link });
    }

    setData(d);
  }, [locationBoardData]);

  return (
    <ul className="mb-4 flex space-x-2 rtl:space-x-reverse items-center pl-62">
      {data.map((item, index) => (
        <li key={item.link || item.name} className="flex items-center space-x-1">
          {index !== 0 && <span className="text-gray-400">/</span>}
          {item.link ? (
            <Link href={item.link} className="capitalize text-primary hover:underline">
              {item.name}
            </Link>
          ) : (
            <span className="capitalize">{item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
