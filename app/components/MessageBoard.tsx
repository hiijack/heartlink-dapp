import { useConnect, useAccount, useDisconnect, useWriteContract } from 'wagmi';
import { toast } from 'sonner';
import { PaperAirplaneIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import abi from '../abi.json';
import { useState } from 'react';
import { getErrorMsg } from '../utils';

const ContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const MessageBoard = ({
  messages,
  isFetching,
  channel,
}: {
  messages: any[];
  isFetching: boolean;
  channel: number;
}) => {
  const [newMsg, setNewMsg] = useState('');
  const [isConnecting, setConnecting] = useState(false);

  const { isConnected } = useAccount();
  const { isPending, writeContract } = useWriteContract();

  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  function connectWallet() {
    setConnecting(true);
    connect(
      { connector: connectors[0] },
      {
        onSuccess() {
          setConnecting(false);
        },
        onError(err) {
          console.error(err);
          toast.error(getErrorMsg(err));
          setConnecting(false);
        },
      }
    );
  }

  function disconnectWallet() {
    disconnect();
  }

  async function sendMsg() {
    if (newMsg) {
      writeContract(
        {
          address: ContractAddress,
          abi,
          functionName: 'postMessage',
          args: [newMsg, channel],
        },
        {
          onSuccess() {
            setNewMsg('');
          },
          onError(err) {
            toast.error(getErrorMsg(err));
            console.error(err);
          },
        }
      );
    }
  }

  return (
    <div className="relative max-w-lg flex-1">
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">欢迎来到心链</h1>
          {isConnected && (
            <button
              className="inline-flex items-center px-3 py-1 rounded-md bg-indigo-500 text-white text-sm cursor-pointer"
              onClick={disconnectWallet}
            >
              登出
              <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        <span className="text-sm text-gray-600">基于区块链的去中心化社交应用（仅用于演示）</span>
      </div>
      <div className="h-4/5 overflow-y-auto">
        {isFetching && <p className="mt-4">加载中...</p>}
        {!isFetching && (messages as any[]).length === 0 && <p className="mt-4 text-center">暂无消息</p>}
        {!isFetching &&
          (messages as any[]).map((msg) => (
            <div key={msg.timestamp} className="p-1 mt-4 flex gap-x-4 hover:bg-gray-100">
              <img className="h-11 w-11" src={`https://joesch.moe/api/v1/${msg.author}`} alt="头像" />
              <div>
                <p>
                  <span className="text-blue-600 mr-2 hover:underline cursor-pointer" title={msg.author}>
                    @{msg.author.slice(0, 6)}...{msg.author.slice(-4)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(Number(msg.timestamp) * 1000).toLocaleString()}
                  </span>
                </p>
                <p className="whitespace-pre-wrap text-gray-800">{msg.content}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="absolute bottom-6 w-full">
        {!isConnected && (
          <button
            disabled={isConnecting}
            type="button"
            className="w-full rounded-md p-2 bg-indigo-500 text-white hover:bg-indigo-400 disabled:bg-indigo-400"
            onClick={connectWallet}
          >
            {isConnecting ? '连接中' : '连接'}
          </button>
        )}
        {isConnected && (
          <div className="mx-auto flex rounded-md outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-400">
            <input
              className="w-full py-2 px-4 outline-none disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="发消息"
              disabled={isPending}
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
            />
            <button
              disabled={isPending}
              className="m-1 px-3 rounded-md bg-indigo-500 text-white text-sm cursor-pointer disabled:bg-indigo-400"
              onClick={sendMsg}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
