import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen bg-[url('/error.png')] bg-red-600 bg-blend-overlay bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center px-6  overflow-hidden ">
      <div className="absolute w-[500px] h-[500px]  blur-[80px] rounded-full -top-40 left-10 animate-pulse "></div>
      <div className="absolute w-[400px] h-[400px]  blur-[160px] rounded-full  animate-ping "></div>

      <div className="relative z-10 bg-black/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 md:p-16 max-w-2xl flex flex-col items-center space-y-6 animate-fadeIn bg-[url('/404.jpeg')]  bg-blend-overlay bg-cover bg-center bg-no-repeat">
        <div className="text-6xl text-emerald-600 animate-bounce">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/arcade/64/error.png"
            alt="error"
            className="drop-shadow-[0_0_20px_rgba(16,185,129,0.7)] animate-spin-slow"
          />
        </div>

        <h1 className="text-[90px] md:text-[120px] font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 text-transparent bg-clip-text drop-shadow-[0_0_20px_#10B981] tracking-wider animate-glow font-sans">
          404
        </h1>

        <p className="text-gray-200 text-xl max-w-md font-semibold leading-relaxed fontStyle">
          Oops! The page you’re looking for doesn’t exist — or it may have been
          moved somewhere else 🚀
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 fontStyle text-xl text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-emerald-400/40 hover:scale-105 "
        >
          <FaExclamationTriangle className="text-yellow-300 animate-wiggle" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
