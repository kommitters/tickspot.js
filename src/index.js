import ClientV2 from './v2/client.js';

const tickspot = ({
  apiVersion,
  subscriptionId,
  apiToken,
  agentEmail,
}) => {
  switch (apiVersion) {
    case 2:
      return new ClientV2({ subscriptionId, apiToken, agentEmail });
    default:
      return new Error('The version is not available');
  }
};

export default tickspot;
