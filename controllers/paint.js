const mongodb = require('../config/mongodb');

const getAll = async (request, response) => {
  try {
    const result = await mongodb.getDb().db('homeProjects').collection('paint').find();
    result.toArray().then((lists) => {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).json(lists);
    });
  } catch (err) {
    response.status(500).json(err);
  }
};
const newPaint = async (request, response) => {
  try {
    const paintColor = {
      item: request.body.item,
      color: request.body.color,
      room: request.body.room,
      brand: request.body.brand,
      sheen: request.body.sheen,
      remaining: request.body.remaining
    };
    const res = await mongodb
      .getDb()
      .db('homeProjects')
      .collection('paint')
      .insertOne(paintColor);
    if (res.acknowledged) {
      response.status(201).json(res);
    } else {
      response.status(500).json(res.error || 'Error occurred while creating your DIY.');
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  getAll,
  newPaint
};
