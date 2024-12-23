const Header = () => {
  return (
    <div className="logo text-center mt-8 ">
      <a href="/" className="relative inline-block px-6 py-3 group">
        <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-black group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-gray-900 transition-all duration-500">
          Snap <span className="text-blue-400 drop-shadow-lg">CVs</span>
        </h3>
        <span className="absolute inset-0 border-2 border-blue-500 rounded-lg blur-md group-hover:blur-lg group-hover:opacity-75 transition-all duration-500"></span>
      </a>
    </div>
  );
};

export default Header;
