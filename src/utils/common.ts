export const createSagaAction = (type: string, payload: any = {}) => {
    return {
      type,
      payload,
    };
  };