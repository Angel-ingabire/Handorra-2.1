const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'handorra-20-main',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewUser', inputVars);
}
createNewUserRef.operationName = 'CreateNewUser';
exports.createNewUserRef = createNewUserRef;

exports.createNewUser = function createNewUser(dcOrVars, vars) {
  return executeMutation(createNewUserRef(dcOrVars, vars));
};

const getArtworkByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArtworkById', inputVars);
}
getArtworkByIdRef.operationName = 'GetArtworkById';
exports.getArtworkByIdRef = getArtworkByIdRef;

exports.getArtworkById = function getArtworkById(dcOrVars, vars) {
  return executeQuery(getArtworkByIdRef(dcOrVars, vars));
};

const updateArtworkQuantityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateArtworkQuantity', inputVars);
}
updateArtworkQuantityRef.operationName = 'UpdateArtworkQuantity';
exports.updateArtworkQuantityRef = updateArtworkQuantityRef;

exports.updateArtworkQuantity = function updateArtworkQuantity(dcOrVars, vars) {
  return executeMutation(updateArtworkQuantityRef(dcOrVars, vars));
};

const listArtworksByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListArtworksByCategory', inputVars);
}
listArtworksByCategoryRef.operationName = 'ListArtworksByCategory';
exports.listArtworksByCategoryRef = listArtworksByCategoryRef;

exports.listArtworksByCategory = function listArtworksByCategory(dcOrVars, vars) {
  return executeQuery(listArtworksByCategoryRef(dcOrVars, vars));
};
