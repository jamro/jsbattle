function errorReducer(state = {}, action = {}) {
  const {type, payload} = action;
  const matches = (/(.*)_(REQUEST|FAILURE|CLEAR_ERROR)/).exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  if(payload) {
    console.warn(payload);
  }

  return {
    ...state,
    [requestName]: (payload && requestState === 'FAILURE') ? payload.message : '',
  };
}

export default errorReducer;
