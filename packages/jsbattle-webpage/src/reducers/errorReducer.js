function errorReducer(state = {}, action) {
  const {type, payload} = action;
  const matches = (/(.*)_(REQUEST|FAILURE|CLEAR_ERROR)/).exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? payload.message : '',
  };
}

export default errorReducer;
