import express, { response } from "express";
import db from "./database/connection";
import convertHoursToMinutes from "./utils/convertHoursToMinutes";

const routes = express.Router();

interface ScheduleItem {
  weekday: number;
  from: string;
  to: string;
}

routes.post("/classes", async (req, res) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

  const trx = await db.transaction();

  try {
    const [user_id] = await trx("users").insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const [class_id] = await trx("classes").insert({
      subject,
      cost,
      user_id,
    });

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        weekday: scheduleItem.weekday,
        from: convertHoursToMinutes(scheduleItem.from),
        to: convertHoursToMinutes(scheduleItem.to),
      };
    });

    await trx("class_schedule").insert(classSchedule);

    await trx.commit();

    return res
      .status(201)
      .json({ message: "Success while creating new class" });
  } catch (err) {
    await trx.rollback();
    return res.status(400).json({ message: "Error while creating new class" });
  }
});

export default routes;
