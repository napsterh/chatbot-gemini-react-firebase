import { useState, useEffect } from 'react';
import { db } from '../lib/firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc } from 'firebase/firestore';

const useChat = (userId, conversationId, userProfilePicUrl, botProfilePicUrl) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setChat(messages);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = {
        prompt: message,
        sender: userId,
        timestamp: serverTimestamp(),
        profilePicUrl: userProfilePicUrl,
      };

      setChat((prevChat) => [...prevChat, userMessage]);
      setMessage('');
      setIsTyping(true);

      try {
        await addDoc(collection(db, 'conversations', conversationId, 'messages'), userMessage);

        const botResponseRef = await addDoc(collection(db, 'conversations'), {
          prompt: message,
        });

        const unsubscribe = onSnapshot(doc(db, 'conversations', botResponseRef.id), async (snap) => {
          if (snap.get('response')) {
            const botMessage = {
              prompt: snap.get('response'),
              sender: 'bot',
              timestamp: serverTimestamp(),
              profilePicUrl: botProfilePicUrl,
            };

            await addDoc(collection(db, 'conversations', conversationId, 'messages'), botMessage);
            setChat((prevChat) => [...prevChat, botMessage]);
            setIsTyping(false);
            unsubscribe();
          }
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return {
    message,
    setMessage,
    chat,
    isTyping,
    handleSendMessage,
    handleKeyDown,
  };
};

export default useChat;
