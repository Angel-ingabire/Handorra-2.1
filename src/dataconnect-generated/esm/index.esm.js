import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'handorra-20-main',
  location: 'us-east4'
};

export const createNewUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewUser', inputVars);
}
createNewUserRef.operationName = 'CreateNewUser';

export function createNewUser(dcOrVars, vars) {
  return executeMutation(createNewUserRef(dcOrVars, vars));
}

export const getArtworkByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArtworkById', inputVars);
}
getArtworkByIdRef.operationName = 'GetArtworkById';

export function getArtworkById(dcOrVars, vars) {
  return executeQuery(getArtworkByIdRef(dcOrVars, vars));
}

export const updateArtworkQuantityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateArtworkQuantity', inputVars);
}
updateArtworkQuantityRef.operationName = 'UpdateArtworkQuantity';

export function updateArtworkQuantity(dcOrVars, vars) {
  return executeMutation(updateArtworkQuantityRef(dcOrVars, vars));
}

export const listArtworksByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListArtworksByCategory', inputVars);
}
listArtworksByCategoryRef.operationName = 'ListArtworksByCategory';

export function listArtworksByCategory(dcOrVars, vars) {
  return executeQuery(listArtworksByCategoryRef(dcOrVars, vars));
}

