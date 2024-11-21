
import chatbotImage from '../assets/geminiIA.png';
import { Link } from 'react-router-dom';
import "../styles/home.css"

const Home = () => {
   return (
      <div className="home-container-view">
         <div className="home-view-content">
            <h1 className="home-title">¡Bienvenidos al DevFest Lima 2024!</h1>
            <p className="home-subtitle">
               Chatbot intuitivo desarrollado con React, Firebase y Gemini IA.
            </p>
            <div className="home-content-btn-img">
               <img
                  src={chatbotImage}
                  alt="Welcome to the Chatbot Workshop"
                  width={400}
                  height={250}
                  className="home-img"
               />
               <Link to="/chat" className="home-btn-iniciar hover:bg-blue-700">
                  INICIAR
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Home;
