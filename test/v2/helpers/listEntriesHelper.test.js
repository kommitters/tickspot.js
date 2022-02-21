import wrongParamsTests from '#test/v2/shared/wrongParams';
import listEntriesHelper from '#src/v2/helpers/listEntriesHelper';

describe('listEntriesHelper', () => {
  const modules = ['entries', 'users', 'projects', 'tasks'];
  const baseURL = 'https://TICK_BASE_URL_START/';

  const params = {
    startDate: '2021-11-08',
    endDate: '2021-11-09',
    userId: 'userId',
    projectId: 'projectId',
    taskId: 'taskId',
  };

  const requiredParamsForModule = (module) => {
    switch (module) {
      case 'user':
        return ['userId'];
      case 'projects':
        return ['projectId'];
      case 'tasks':
        return ['taskId'];
      default:
        return [];
    }
  };

  const urlForModule = (module) => {
    switch (module) {
      case 'users':
        return `${baseURL}/users/${params.userId}/entries.json`;
      case 'projects':
        return `${baseURL}/projects/${params.projectId}/entries.json`;
      case 'tasks':
        return `${baseURL}/tasks/${params.taskId}/entries.json`;
      default:
        return `${baseURL}/entries.json`;
    }
  };

  describe.each(modules)('.%s module', (module) => {
    it(`should return the correct url for ${module} module`, () => {
      const { URL, params: _params } = listEntriesHelper(params, { baseURL, module });
      expect(URL).toEqual(urlForModule(module));
      expect(_params).toEqual({
        start_date: params.startDate,
        end_date: params.endDate,
        user_id: params.userId,
        project_id: params.projectId,
        task_id: params.taskId,
      });
    });

    wrongParamsTests({
      requestToExecute: (requestParams) => listEntriesHelper(requestParams, { baseURL, module }),
      type: 'method',
      requestData: params,
      paramsList: ['startDate', 'endDate', ...requiredParamsForModule(module)],
    });
  });
});
