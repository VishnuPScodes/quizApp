export const getAllConnectionRequests = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const connectionRequests =
      await ConnectionServices_.getAllConnectionRequests(userId);
    res.send(connectionRequests);
  } catch (error) {
    next(error);
  }
};
export const acceptConnectionRequest = async (req, res, next) => {
  try {
    const { userId, connectionId } = req.params;
    const response = await ConnectionServices_.acceptConnectionRequest({
      userId,
      connectionId,
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
};

export const rejectConnectionRequest = async (req, res, next) => {
  try {
    const { userId, connectionId } = req.params;
    const response = await ConnectionServices_.rejectConnectionRequest({
      userId,
      connectionId,
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
};
