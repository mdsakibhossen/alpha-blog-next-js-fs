const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src={"/videos/v1.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className="container mx-auto px-3 relative z-10 text-center text-white flex flex-col justify-center h-full">
        {/* Blog Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
          Welcome to <span className="text-green-300">Alpha</span>Blog
        </h1>
        {/* Blog Subtitle */}
        <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg text-slate-400">
          Your daily dose of insightful articles, tips, and stories.
        </p>
      </div>
    </section>
  );
};

export default Hero;
