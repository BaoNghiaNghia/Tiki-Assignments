const config = {
  development: {
    ASYNC_STORAGE_KEY: "CONG_STORAGE",
    TIKI_ENDPOINT: "https://tiki-minesweeper.herokuapp.com"
  },
  production: {
    ASYNC_STORAGE_KEY: "CONG_STORAGE",
    TIKI_ENDPOINT: "https://tiki-minesweeper.herokuapp.com"
  }
};

export default config[process.env.NODE_ENV || "development"];
