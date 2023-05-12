const mongodb = require('../config/mongodb');
const ObjectId = require('mongodb').ObjectId;


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
      response.status(500).json(res.error || 'Error occurred while creating your PAINT.');
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

const updatePaint = async (request, response) => {
  const paintID = new ObjectId(request.params.id);
  //Error Handling for invalid document id
  try {
    // eslint-disable-next-line no-unused-vars
    let check = await mongodb
      .getDb()
      .db('homeProjects')
      .collection('paint')
      .find({ _id: paintID });
  } catch (err) {
    return response
      .status(404)
      .json(err || 'The provided ID does not exist in the database')
      .send();
  }
  const PAINT = {
    color: request.body.color,
    room: request.body.room,
    brand: request.body.brand,
    sheen: request.body.sheen,
    remaining: request.body.remaining
  };
  const resp = await mongodb
    .getDb()
    .db('homeProjects')
    .collection('paint')
    .replaceOne({ _id: paintID }, PAINT);
  console.log(resp);
  if (resp.modifiedCount > 0) {
    return response.status(204).send();
  } else {
    return response
      .status(500)
      .json(resp.error || 'Error occurred while updating your PAINT.')
      .send();
  }
};


const deletePaint = async (request, response) => {
  //Error Handling for invalid document id
  try {
    const userId = new ObjectId(request.params.id);
    try {
      // eslint-disable-next-line no-unused-vars
      let check = await mongodb
        .getDb()
        .db('homeProjects')
        .collection('paint')
        .find({ _id: userId });
    } catch (err) {
      response.status(404).json(err || 'The provided ID does not exist in the database');
    }
    const res = await mongodb
      .getDb()
      .db('homeProjects')
      .collection('paint')
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
  newPaint,
  deletePaint,
  updatePaint
};
