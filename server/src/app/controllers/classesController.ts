import { Request, Response } from "express";

import db from "../../database/connection";
import convertHoursToMinutes from "../../utils/convertHoursToMinutes";

interface ScheduleItem {
  weekday: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;
    if (!filters.subject || !filters.weekday || !filters.time) {
      return res
        .status(400)
        .json({ error: "Missing filters to complete search." });
    }

    const timeInMinutes = convertHoursToMinutes(filters.time as string);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`weekday` = ??", [
            Number(filters.weekday),
          ])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", filters.subject as string)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
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
      return res
        .status(400)
        .json({ message: "Error while creating new class" });
    }
  }
}
