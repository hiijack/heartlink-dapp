import { useState } from 'react';

const Channel = () => {
  const [selected, setSelected] = useState(0);
  const chls = ['游戏', '金融', '科技'];
  return (
    <div className="mb-6 md:w-50">
      <ul>
        {chls.map((c, i) => (
          <li
            key={i}
            className={`rounded-md font-medium p-2 mb-1 cursor-pointer hover:bg-gray-100 hover:text-indigo-500 ${
              selected === i ? 'bg-gray-100 text-indigo-500' : ''
            }`}
            onClick={() => {
              setSelected(i);
            }}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channel;
