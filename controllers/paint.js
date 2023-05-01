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
module.exports = {
  getAll
};
