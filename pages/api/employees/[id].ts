import { connect } from "../../../utils/mongodb";
import employees from "../../../models/Employees";
import { NextApiRequest, NextApiResponse } from "next";

connect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const Employee = await employees.findOne({ id });

        res.status(200).json({ success: true, data: Employee });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedEmployee = await employees.findOneAndDelete({ id });

        res.status(200).json({ success: true, data: deletedEmployee });
      } catch (error) {
        res.status(400).json({ success: false });
      }
  }
};
