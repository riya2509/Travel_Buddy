const appController = {};

appController.welcome = (req, res) => {
  setTimeout(() => {
    res.send({ message: "API is working." });
  }, 5000);
};
export default appController;
