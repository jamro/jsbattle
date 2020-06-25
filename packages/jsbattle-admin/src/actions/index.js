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

export const getLeagueList = (page, pageSize) => {
  page = page || 1;
  pageSize = pageSize || 10;
  return fetchFromApi(`/api/admin/league?page=${page}&pageSize=${pageSize}` , "LEAGUE_LIST");
};

export const getBattleList = (page, pageSize) => {
  page = page || 1;
  pageSize = pageSize || 10;
  const fields = 'id,createdAt,expiresAt,description';
  return fetchFromApi(`/api/admin/battles?page=${page}&pageSize=${pageSize}&sort=-createdAt&fields=${fields}` , "BATTLE_LIST");
};

export const getScriptList = (page, pageSize) => {
  page = page || 1;
  pageSize = pageSize || 10;
  const fields = 'id,ownerName,scriptName,createdAt,modifiedAt';
  return fetchFromApi(`/api/admin/scripts?page=${page}&pageSize=${pageSize}&sort=-createdAt&fields=${fields}` , "SCRIPT_LIST");
};

export const getSessionList = () => {
  return fetchFromApi(`/api/admin/sessions` , "SESSION_LIST");
};

export const getSystemInfo = () => {
  return fetchFromApi(`/api/admin/info` , "SYSTEM_INFO");
};

export const getDashboardInfo = () => {
  return fetchFromApi(`/api/admin/dashboard` , "DASHBOARD_INFO");
};

export const getUserDetails = (id) => {
  return fetchFromApi(`/api/admin/users/${id}/summary` , "USER_VIEW");
};
