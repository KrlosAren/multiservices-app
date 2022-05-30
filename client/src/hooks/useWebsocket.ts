import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

type useWebsocketFunc = {
  socket: Socket;
  online: boolean;
  sendMessage: (message: any) => void;
  onMessage: (callback: (message: any) => void) => void;
};

const useWebsocket = (url: string, logged: boolean): useWebsocketFunc => {
  const [online, setOnline] = useState(false);
  const [idx, setIdx] = useState<undefined | number>(undefined);
  const [socket, setSocket] = useState<any>(null);

  const retryConnect = () => {
    if (socket !== null) {
      return;
    }
    console.log('intentando conectar');
    const idTime = setInterval(() => connectSocket(), 1000);
    setIdx(idTime);
  };

  const connectSocket = () => {
    if (socket !== null) {
      console.log('ya hay un socket');
      return;
    }

    const ws = new WebSocket(url);
    ws.onopen = () => {
      console.log('socket connected');
      setOnline(true);
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('disconnected');
      setOnline(false);
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('error', error);
      setOnline(false);
      setSocket(null);
    };
  };

  useEffect(() => {
    if (!logged) {
      return;
    }

    connectSocket();
  }, [url, logged]);

  useEffect(() => {
    if (socket !== null) {
      retryConnect();
    }
  }, [socket]);

  // send socket message
  const sendMessage = (message: any) => {
    if (socket !== null) {
      socket.send(JSON.stringify(message));
    }
  };

  const onMessage = (callback: (message: any) => void) => {
    if (socket !== null) {
      socket.onmessage = (event: any) => {
        const message = JSON.parse(event.data);
        callback(message);
      };
    }
  };

  return {
    socket,
    online,
    sendMessage,
    onMessage,
  };
};

export default useWebsocket;
