const Scheme = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.params;
    const scheme = await Scheme.findById(scheme_id);
    if (scheme) {
      next();
    } else {
      next({
        status: 404,
        message: `scheme with scheme_id ${scheme_id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  const dataType = typeof scheme_name;
  const trimmed = dataType === "string" ? scheme_name.trim() : scheme_name;

  if (!scheme_name || trimmed.length < 1 || dataType !== "string") {
    next({
      status: 400,
      message: "invalid scheme_name",
    });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  const instructType = typeof instructions;
  const trimmed =
    instructType === "string" ? instructions.trim() : instructions;

  if (
    !instructions ||
    trimmed.length < 1 ||
    instructType !== "string" ||
    isNaN(step_number) ||
    step_number < 1
  ) {
    next({
      status: 400,
      message: "invalid step",
    });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
