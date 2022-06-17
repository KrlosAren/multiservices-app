import { useContext, useEffect, useState } from 'react';
import './App.css';
import SignupForm from './components/Login';
import { AuthContext } from './context/authContext';
import { SocketContext } from './context/socketContext';
import fetchAPI from './utils/fetchApi';

interface messageType {
  id: number;
  text: string;
  user: {
    full_name: string;
  };
}

function App() {
  const [messages, setMessage] = useState<Array<messageType>>([]);

  const {
    logged,
    auth: { access_token },
  } = useContext(AuthContext);

  const fechMessage = async () => {
    const resp = await fetchAPI(
      'http://localhost/node-app/api/messages',
      'get',
      {},
      access_token
    );
    setMessage(resp.data.messages);
  };

  const { socket, onMessage, online } = useContext(SocketContext);
  useEffect(() => {
    if (socket !== null) {
      onMessage((data: any) => setMessage((prev) => [...prev, data.message]));
    }
  }, [socket]);

  useEffect(() => {
    if (logged) {
      fechMessage();
    }
  }, [logged]);

  return (
    <div className='App'>
      {logged ? (
        <>
          {online ? <h1>Online</h1> : <h1>Offline</h1>}
          <h1>vite dev app with hrm</h1>
          {messages.map((message) => (
            <ul key={message.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <p>{message.id}</p>
                <p>{message.user.full_name}</p>
                <span> ---- </span>
                <p>{message.text}</p>
              </div>
            </ul>
          ))}
        </>
      ) : (
        <SignupForm />
      )}
    </div>
  );
}

export default App;
