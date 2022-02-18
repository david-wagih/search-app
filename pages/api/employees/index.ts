import { connect } from "../../../utils/mongodb";
import employees from "../../../models/Employees";
import { NextApiRequest, NextApiResponse } from "next";

connect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const Employees = await employees.find({});

        res.status(200).json({ success: true, data: Employees });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const Employee = await employees.create(req.body);

        res.status(201).json({ success: true, data: Employee });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
