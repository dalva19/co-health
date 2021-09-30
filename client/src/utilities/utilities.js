import _ from "lodash";
export const validFields = (input, setErrors) => {
  const errorMessages = _.reduce(
    input,
    function (acc, field, key) {
      if (!field) {
        acc[key] = { message: `The ${key} field is required` };
      }

      return acc;
    },
    {}
  );

  setErrors(errorMessages);

  return _.isEmpty(errorMessages);
};
