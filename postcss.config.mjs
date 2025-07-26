const config = {
  plugins: ["@tailwindcss/postcss"],
  theme:{
    extends:{
      screen:{
        xs:"300px",
        sm:"600px",
        md:"900px",
        lg:"1200px",
        "2xl":"1400px",
      }
    }
  }
};

export default config;
