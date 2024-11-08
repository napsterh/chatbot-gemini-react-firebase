import { useState, useEffect } from 'react';
import useChat from '../hooks/useChat';
import botImage from '../../src/assets/geminiIA.png';
import userImage from '../../src/assets/man.png';
import "../styles/chat.css";

const USER_ID = '1';
const CONVERSATION_ID = '1';
const USER_PROFILE_PIC_URL = userImage;
const BOT_PROFILE_PIC_URL = botImage;

export default function Chat() {
   const {
      message,
      setMessage,
      chat,
      isTyping,
      handleSendMessage,
      handleKeyDown,
   } = useChat(
      USER_ID, CONVERSATION_ID, USER_PROFILE_PIC_URL,
      BOT_PROFILE_PIC_URL
   );

   const [displayText, setDisplayText] = useState('');
   const [currentMsg, setCurrentMsg] = useState('');

   useEffect(() => {
      if (chat.length > 0) {
         const lastMessage = chat[chat.length - 1];
         if (lastMessage.sender !== USER_ID) {
            setDisplayText('');
            const cleanedMessage = cleanMarkdown(lastMessage.prompt); // Limpiar el formato Markdown
            setCurrentMsg(cleanedMessage);
            typeMessage(cleanedMessage);
         }
      }
   }, [chat]);

   // Función para limpiar el formato de Markdown
   const cleanMarkdown = (text) => {
      return text.replace(/^##\s*/, ''); // Elimina '## ' al inicio del texto. Aveces Gemini se satura y manda eso xD
   };

   const typeMessage = (text) => {
      let index = 0;
      let tempText = ''; // Variable temporal para construir el texto

      const typeNextChar = () => {
         if (index < text.length) {
            tempText += text.charAt(index); // Agrega el carácter actual a la variable temporal
            setDisplayText(tempText); // Actualiza displayText con la variable temporal
            index++;
            requestAnimationFrame(typeNextChar); // Llama al siguiente carácter en el próximo cuadro de animación
         }
      };

      requestAnimationFrame(typeNextChar); // Inicia el ciclo de animación
   };

   return (
      <div className="chat-container">
         <div className="chat-box">
            <div className="chat-principal-title">
               ¿En qué puedo ayudarte?
            </div>
            <div className="chat-messages">
               {chat.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender === USER_ID ? 'sent' : 'received'}`}>
                     <img src={msg.profilePicUrl} alt="profile" className="profile-pic-man" />
                     <div className={`message-content ${msg.sender === USER_ID ? 'user-message' : 'bot-message'}`}>
                        {msg.sender === USER_ID ? (
                           msg.prompt
                        ) : (
                           <div>{ index === chat.length - 1 ? displayText : cleanMarkdown(msg.prompt) }</div>
                        )}
                     </div>
                  </div>
               ))}
               {isTyping && (
                  <div className="message received">
                     <img src={BOT_PROFILE_PIC_URL} alt="bot typing" className="profile-pic-bot" />
                     <div className="bot-typing">Gemini Bot está escribiendo...</div>
                  </div>
               )}
            </div>
            <div className="chat-input">
               <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Pregúntame lo que deseas..."
                  className="input-field"
               />
               <button onClick={handleSendMessage} className="send-button">Enviar</button>
               {/* <button onClick={resetChat} className="send-button">Reset</button> */}
            </div>
         </div>
      </div>
   );
}
