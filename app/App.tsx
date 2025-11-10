import { Toaster } from 'sonner';
import Channel from './components/Channel';
import MessageBoard from './components/MessageBoard';

function App() {
  return (
    <div className="max-w-3xl flex mx-auto h-screen pt-12 gap-x-4">
      <Toaster
        position="top-left"
        toastOptions={{
          classNames: {
            icon: '!text-red-400',
            title: '!text-red-400',
          },
        }}
      />
      <Channel />
      <MessageBoard />
    </div>
  );
}

export default App;
