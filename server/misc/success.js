module.exports = {
  GET_SUCCESS: (res, data) => {
    return res.status(200).json({
      status: "Success",
      data: data,
    });
  },
  CREATE_SUCCESS: (res, table, data) => {
    return res.status(201).json({
      status: `${table} created successfully`,
      data: data,
    });
  },
  UPDATE_SUCCESS: (res, table, id, data) => {
    return res.status(201).json({
      status: `${table} with id ${id} updated successfully`,
      data: data,
    });
  },
  DELETE_SUCCESS: (res, table, id) => {
    return res.status(200).json({
      status: `${table} with id ${id} deleted successfully`,
    });
  },
};
