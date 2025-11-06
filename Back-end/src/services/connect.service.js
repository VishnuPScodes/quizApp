import Connection from "../models/connection.model.js";
import { BadRequestError } from "../utils/response/error.js";

class ConnectionService {
  constructor() {
    this._connectionModel = Connection;
  }
  async addConnection(connection) {
    const newConnection = await this._connectionModel.create(connection);
    if (!newConnection) {
      throw new BadRequestError("Could not create connection");
    }

    return newConnection;
  }

  async approveOrRejectConnection({ connectionId, status }) {
    const connection = await this._connectionModel.findById(connectionId);
    if (!connection) {
      throw new BadRequestError("Connection not found");
    }
    connection.status = status;
    const updatedConnection = await connection.save();
    if (!updatedConnection) {
      throw new BadRequestError("Could not update connection");
    }

    return updatedConnection;
  }

  async getAllConnectionRequests(userId) {
    const connectionRequests = await this._connectionModel
      .find({ toUser: userId, status: "pending" })
      .populate("fromUser", "name email");
    if (!connectionRequests) {
      throw new BadRequestError("Could not fetch connection requests");
    }

    return connectionRequests;
  }
}
