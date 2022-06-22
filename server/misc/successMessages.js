module.exports = {
  GET_SUCCESS: (data) => {
    return {
      status: "Success",
      data: data,
    };
  },
  CREATE_SUCCESS: (table, data) => {
    return {
      status: `${table} created successfully`,
      data: data,
    };
  },
  UPDATE_SUCCESS: (table, id, data) => {
    return {
      status: `${table} with id ${id} updated successfully`,
      data: data,
    };
  },
  DELETE_SUCCESS: (table, id) => {
    return {
      status: `${table} with id ${id} deleted successfully`,
    };
  },
};
