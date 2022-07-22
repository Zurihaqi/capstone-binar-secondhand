module.exports = {
  GET_SUCCESS: (res, data) => {
    return res.status(200).json({
      status: "Success",
      data: data,
    });
  },
  CREATE_SUCCESS: (res, table, data) => {
    return res.status(201).json({
      status: `Success`,
      data: data,
    });
  },
  UPDATE_SUCCESS: (res, table, id, data) => {
    return res.status(201).json({
      status: `Success`,
      data: data,
    });
  },
  DELETE_SUCCESS: (res, table, id) => {
    return res.status(200).json({
      status: `Success`,
    });
  },
  LOGIN_SUCCESS: (res, token, id) => {
    return res.status(200).json({
      status: "Success",
      id: id,
      token: token,
    });
  },
  REGISTER_SUCCESS: (res, data) => {
    return res.status(201).json({
      status: "Success",
      data: data,
    });
  },
};
