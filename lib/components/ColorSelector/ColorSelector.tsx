'use client';

import React, { useState } from 'react';

interface ColorSelectorProps {
  colors: string[];
  selectedColor?: string;
  onChange?: (color: string) => void;
}

const colorMap: Record<string, string> = {
  coffee: 'bg-[#6F4E37]',
  darkbrown: 'bg-[#55433B]',
  olive: 'bg-[#808000]',
  tan: 'bg-[#D2B48C]',
  black: 'bg-[#000000]',
  beige: 'bg-[#F5F5DC]',
  navy: 'bg-[#000080]',
  white: 'bg-white border border-gray-200',
  gray: 'bg-[#808080]',
  red: 'bg-[#B22222]',
  charcoal: 'bg-[#36454F]',
  khaki: 'bg-[#C3B091]',
  burgundy: 'bg-red-900',
  blue: 'bg-blue-700',
  'light-wash': 'bg-blue-200',
};

export default function ColorSelector({
  colors,
  selectedColor,
  onChange,
}: ColorSelectorProps) {
  const [selected, setSelected] = useState(selectedColor || colors[0]);

  const handleColorChange = (color: string) => {
    setSelected(color);
    if (onChange) {
      onChange(color);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map(color => (
        <button
          key={color}
          className={`w-10 h-10 rounded-md ${colorMap[color] || 'bg-gray-500'} ${
            (selectedColor || selected) === color
              ? 'ring-2 ring-offset-2 ring-black'
              : ''
          }`}
          onClick={() => handleColorChange(color)}
          aria-label={`Select ${color} color`}
          title={color.charAt(0).toUpperCase() + color.slice(1)}
        />
      ))}
    </div>
  );
}
