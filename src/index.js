const { S3 } = require("./factory");

module.exports.handler = async (event) => {
  const allBuckets = await S3.listBuckets().promise()
  console.log('findAllBuckets ', allBuckets);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        allBuckets
      },
      null,
      2
    ),
  };
};
