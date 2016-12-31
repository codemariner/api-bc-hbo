'use strict';

const path = require('path');

module.exports.handler = (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: path.basename(__filename),
        input: event,
      }),
  };

  callback(null, response);

};
