import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [logEntries, setLogEntries] = useState<Set<string>>(new Set());

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL || "");
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.emit('joinRoom', 'room1');

    socket.on('serviceHit', (message) => {
      const now = new Date();
      const formattedDate = now.toLocaleString('en-US', {
        hour12: false,
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const logEntry = `${formattedDate}: service hit - ${message}`;

      setLogEntries((prevLogEntries) => {
        const newLogEntries = new Set(prevLogEntries);
        newLogEntries.add(logEntry);
        return newLogEntries;
      });

      console.log(logEntry);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Service Logs</h1>
      <div className="log-container">
        {Array.from(logEntries).map((entry, index) => (
          <div key={index} className="log-entry">
            <code>{entry}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
