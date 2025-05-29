module.exports = {
  // Enable serverless functions
  target: "serverless",

  // Optional: Increase timeout if needed
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
