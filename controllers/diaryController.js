const { Diary, User, Tag } = require("../models");

class DiaryController {
  static async createDiary(req, res, next) {
    try {
      const { title, story, imageUrl, TagId } = req.body;
      const newDiary = await Diary.create({
        title,
        story,
        imageUrl,
        UserId: req.currentUser.id,
        TagId,
      });
      res.status(201).json(newDiary);
    } catch (err) {
      next(err);
    }
  }
  static async getDiary(req, res, next) {
    try {
      const diary = await Diary.findAll({
        where: { UserId: req.currentUser.id },
      });
      res.status(200).json(diary);
    } catch (err) {
      next(err);
    }
  }
  static async updateDiary(req, res, next) {
    try {
      const { title, stroy, imageUrl, TagId } = req.body;
      const diaryId = req.params.id;
      const findDiary = await Diary.findByPk(diaryId);
      if (!findDiary) {
        throw { name: "NotFound" };
      }
      const updateDiary = await Diary.update(
        { title, stroy, imageUrl, TagId },
        { where: { id: diaryId }, returning: true }
      );
      res.status(200).json(updateDiary);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = DiaryController;
