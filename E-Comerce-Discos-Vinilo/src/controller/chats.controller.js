//
export class ChatsController {
  /////////////////////////////////////////////////////
  static getChats_controller = async (req, res) => {
    try {
      if (req.user?.email) {
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          userFirstName: req.user.name,
          style: "chat.css",
        };
        res.render("chat", data);
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
}
