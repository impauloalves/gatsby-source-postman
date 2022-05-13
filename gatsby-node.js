const axios = require("axios");

async function getCollection(collectionId, apiToken) {
  const url = `https://api.getpostman.com/collections/${collectionId}`;
  try {
    const { data } = await axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-api-key": apiToken,
      },
    });
    return data.collection;
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
}

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  { collectionId, apiToken }
) => {
  // Node
  const COLLECTION_TYPE = "Collection";
  const REQUEST_TYPE = "Request";

  try {
    // Get Postman Collection
    const collection = await getCollection(collectionId, apiToken);
    const { info, item } = collection;
    // Create a node for the Postman Collection
    actions.createNode({
      id: createNodeId(`${COLLECTION_TYPE}-${info._postman_id}`),
      ...info,
      internal: {
        type: COLLECTION_TYPE,
        contentDigest: createContentDigest(info),
      },
    });
    // Create node for each Postman Collection Request
    for (const i of item) {
      actions.createNode({
        id: createNodeId(`${REQUEST_TYPE}-${i.id}`),
        ...i,
        internal: {
          type: REQUEST_TYPE,
          contentDigest: createContentDigest(i),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
