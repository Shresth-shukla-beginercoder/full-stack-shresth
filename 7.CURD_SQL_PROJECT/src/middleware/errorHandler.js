//Centralized error handling middleware
const errorHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  };

  export default errorHandler;