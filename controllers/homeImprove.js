const mongodb = require('../config/mongodb');

const getAll = async (request, response) => {
  try {
    const result = await mongodb.getDb().db('homeProjects').collection('homeImprovement').find();
    result.toArray().then((lists) => {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).json(lists);
    });
  } catch (err) {
    response.status(500).json(err);
  }
};

const createDIY = async (request, response) => {
  try {
    const DIY = {
      item: request.body.item,
      estimatedCost: request.body.estimatedCost,
      tiannaPriority: request.body.tiannaPriority,
      toddPriority: request.body.toddPriority,
      totalPriority: request.body.totalPriority,
      store: request.body.store,
      room: request.body.room,
      transportation: request.body.transportation
    };
    const res = await mongodb
      .getDb()
      .db('homeProjects')
      .collection('homeImprovement')
      .insertOne(DIY);
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
  createDIY
};
