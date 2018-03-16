'use strict';

/**
 * Helper to build JSON body of Response
 */
module.exports = function buildJsonResponse(code = '200', errors = []) {
  let json_res = {};
  switch (code) {
    case "200":
      json_res = {
        success: 'ok'
      };
      break;
      case "400":
        json_res = {
          errors: []
        };
        errors.map((error)=>{
          json_res.errors.push({
            "field": error,
            "message": "Invalid parameter"
          });
        });
        /*if((typeof reason == "string") && ( reason != null)){
          if(reason == 'missMandatoryParams') {
            errors.map((error)=>{
              json_res.errors.push({
                "field": error,
                "message": "Missing the mandatory parameter"
              });
            });
          }
          if(reason == 'invalidParams') {
            errors.map((error)=>{
              json_res.errors.push({
                "field": error,
                "message": "Invalid parameter"
              });
            });
          }
        }
        else {

        }*/
        break;
    default:
      break;

  }
  return json_res;
};
