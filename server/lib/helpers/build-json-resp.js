'use strict';

/**
 * Helper to build JSON body of Response
 */
module.exports = function buildJsonResponse(errors = []) {

  // no error then return success
  if(typeof errors === 'object' && errors.length === 0) {

    const timestamp = Date.now();

    const jsonRes = { code:'200',
                       message:{
                         id: timestamp,
                         message: 'The email has been queued. Thank you.'
                       }
                    };
    return jsonRes;
  }
  console.log(JSON.stringify(errors));

  let jsonRes = {code:'', errors:[]};

  errors.map((error) => {
    if(error.hasOwnProperty('missing')) {
      jsonRes.errors.push({
        "field": error.missing,
        "message": "Missing the mandatory parameter"
      });
    }
  });
  //console.log(JSON.stringify(jsonRes.errors));
  //console.log(jsonRes.errors.length);
  if(jsonRes.errors.length > 0) {
    jsonRes.code = '400';
    return jsonRes;
  }

  errors.map((error) => {
    if(error.hasOwnProperty('invalid')) {
      jsonRes.errors.push({
        "field": error.invalid,
        "message": "The from email does not contain a valid address"
      });
    }
  });

  if(jsonRes.errors.length > 0) {
    jsonRes.code = '402';
    return jsonRes;
  }

  return jsonRes;
};
