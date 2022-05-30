import { createContext, ReactElement, useContext } from 'react';
import { Socket } from 'socket.io-client';
import useWebsocket from '../hooks/useWebsocket';
import { AuthContext } from './authContext';

type SocketContextType = {
  socket: null | Socket;
  online: boolean;
  sendMessage: (message: string) => void;
  onMessage: (func: (msg: string) => void) => void;
};

export const SocketContext = createContext({} as SocketContextType);

export const SocketProvider = ({ children }: { children: ReactElement }) => {
  const {
    auth: { access_token },
    logged,
  } = useContext(AuthContext);

  const connectSocket = (access_token: string, logged: boolean) => {
    const { socket, online, sendMessage, onMessage } = useWebsocket(
      access_token,
      logged
    );
    return {
      socket,
      online,
      sendMessage,
      onMessage,
    };
  };


  const { socket, online, sendMessage, onMessage } = useWebsocket(
    `ws://localhost/django-app/ws/?access_token=${access_token}`,
    logged
  );
  return (
    <SocketContext.Provider value={{ socket, online, sendMessage, onMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
