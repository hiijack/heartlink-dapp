import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useBlockNumber, useReadContract } from 'wagmi';
import Channel from './components/Channel';
import MessageBoard from './components/MessageBoard';
import abi from './abi.json';

const ContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {
  const [curChannel, setCurChannel] = useState(0);
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const read = useReadContract({
    address: ContractAddress,
    abi,
    functionName: 'getMessages',
    query: {
      refetchOnWindowFocus: false,
    },
  });

  const { data: messages = [], refetch, isFetching } = read;

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  return (
    <div className="max-w-3xl flex mx-auto h-screen pt-12 gap-x-4">
      <Channel
        current={curChannel}
        onChange={(c) => {
          setCurChannel(c);
        }}
      />
      <MessageBoard
        messages={(messages as any[]).filter((m) => m.channel === curChannel)}
        isFetching={isFetching}
        channel={curChannel}
      />
      <Analytics />
    </div>
  );
}

export default App;
