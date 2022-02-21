/**
 * This will return URL and params to retrieve the list of entries that meet the provided parameters
 * and are related to the respective module.
 *
 * @param {object} Filters contains the params to get the entries.
 *    [Required] startDate, Format is: 'YYYY-MM-DD'.
 *    [Required] endDate, Format is: 'YYYY-MM-DD'.
 *    [Optional] userId, will be ignored if the user is not an administrator.
 *    [Optional] projectId, related parent project.
 *    [Optional] taskId, related parent task.
 *    [Optional] billable
 *    [Optional] billed
 *
 * @param {object} Utils contains info needed to make the request
 *
 * @returns {object} array with the list of entries or an error if the process fails.
 */
const listEntriesHelper = ({
  startDate,
  endDate,
  userId,
  projectId,
  taskId,
  billable,
  billed,
}, {
  baseURL,
  module = 'entries',
}) => {
  if (!startDate) throw new Error('startDate field is missing');
  if (!endDate) throw new Error('endDate field is missing');

  let URL;

  switch (module) {
    case 'tasks':
      if (!taskId) throw new Error('taskId field is missing');
      URL = `${baseURL}/tasks/${taskId}/entries.json`;
      break;
    case 'projects':
      if (!projectId) throw new Error('projectId field is missing');
      URL = `${baseURL}/projects/${projectId}/entries.json`;
      break;
    case 'users':
      if (!userId) throw new Error('userId field is missing');
      URL = `${baseURL}/users/${userId}/entries.json`;
      break;
    default:
      URL = `${baseURL}/entries.json`;
  }

  const params = {
    start_date: startDate,
    end_date: endDate,
    ...(userId && { user_id: userId }),
    ...(projectId && { project_id: projectId }),
    ...(taskId && { task_id: taskId }),
    ...(billable && { billable }),
    ...(billed && { billed }),
  };

  return { URL, params };
};

export default listEntriesHelper;
