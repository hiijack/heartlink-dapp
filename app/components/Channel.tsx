const Channel = ({ current, onChange }: { current: number; onChange: (c: number) => void }) => {
  const chls = ['金融', '游戏', '科技'];
  return (
    <div className="mb-6 md:w-50">
      <ul>
        {chls.map((c, i) => (
          <li
            key={i}
            className={`rounded-md font-medium p-2 mb-1 cursor-pointer hover:bg-gray-100 hover:text-indigo-500 ${
              current === i ? 'bg-gray-100 text-indigo-500' : ''
            }`}
            onClick={() => {
              onChange(i);
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
