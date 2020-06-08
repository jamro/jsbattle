export const clearError = (type) => ({
    type: type + "_CLEAR_ERROR"
});

function fetchFromApi(url, type) {
  return async (dispatch) => {
    dispatch({type: type + "_REQUEST"});
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      let json = await response.json();
      dispatch({type: type + "_SUCCESS", payload: json});
    } catch (err) {
      dispatch({type: type + "_FAILURE", payload: err, error: true});
    }
  };
}

export const getAuthMethods = () => {
  return fetchFromApi("/api/authMethods", "AUTH_METHODS");
};

export const getUserProfile = () => {
  return fetchFromApi("/api/profile", "USER_PROFILE");
};

export const getUserList = (page, pageSize) => {
  page = page || 1;
  pageSize = pageSize || 10;
  return fetchFromApi(`/api/admin/users?page=${page}&pageSize=${pageSize}` , "USER_LIST");
};

export const getBattleList = (page, pageSize) => {
  page = page || 1;
  pageSize = pageSize || 10;
  const fields = 'id,createdAt,expiresAt,description';
  return fetchFromApi(`/api/admin/battles?page=${page}&pageSize=${pageSize}&sort=-createdAt&fields=${fields}` , "BATTLE_LIST");
};
