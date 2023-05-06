const mongodb = require('../config/mongodb');
const ObjectId = require('mongodb').ObjectId;

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

const updateDIY = async (request, response) => {
  // let accepted_fields = await mongodb
  //   .getDb()
  //   .db('homeProjects')
  //   .collection('homeImprovement')
  //   .findOne();
  // accepted_fields = Object.keys(accepted_fields);
  // try {
  //   let keys = Object.keys(request.body);
  //   if (keys.includes('_id')) {
  //     return response.status(400).json('Malformed Payload. Review and try again').send();
  //   }
  //   keys.forEach((key) => {
  //     if (!accepted_fields.includes(key)) {
  //       return response.status(400).json('Malformed Payload. Review and try again').send();
  //     }
  //   });
  // } catch (err) {
  //   return response.status(500).json('Unexpected Server Error').send();
  // }
  const DiyId = new ObjectId(request.params.id);
  //Error Handling for invalid document id
  try {
    // eslint-disable-next-line no-unused-vars
    let check = await mongodb
      .getDb()
      .db('homeProjects')
      .collection('homeImprovement')
      .find({ _id: DiyId });
  } catch (err) {
    return response
      .status(404)
      .json(err || 'The provided ID does not exist in the database')
      .send();
  }
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
  const resp = await mongodb
    .getDb()
    .db('homeProjects')
    .collection('homeImprovement')
    .replaceOne({ _id: DiyId }, DIY);
  console.log(resp);
  if (resp.modifiedCount > 0) {
    return response.status(204).send();
  } else {
    return response
      .status(500)
      .json(resp.error || 'Error occurred while updating your DIY.')
      .send();
  }
};

const deleteDIY = async (request, response) => {
  //Error Handling for invalid document id
  try {
    const userId = new ObjectId(request.params.id);
    try {
      // eslint-disable-next-line no-unused-vars
      let check = await mongodb
        .getDb()
        .db('homeProjects')
        .collection('homeImprovement')
        .find({ _id: userId });
    } catch (err) {
      response.status(404).json(err || 'The provided ID does not exist in the database');
    }
    const res = await mongodb
      .getDb()
      .db('homeProjects')
      .collection('homeImprovement')
      .deleteOne({ _id: userId });
    console.log(res);
    if (res.deletedCount > 0) {
      response.status(200).send();
    } else {
      response.status(500).json(res.error || 'Error occurred while deleting your contact.');
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  getAll,
  createDIY,
  updateDIY,
  deleteDIY
};
