// No authentication. demonstrate POST with data in body

const sourceData = {
  title: "Contract 2",
  signature1: "31d6cfe0d16ae931b73c59d7e0c089c0",
  signature2: "032f75b3ca02a393196a818328bd32e8",
  etherscan: "https://etherscan.io/tx/0xdbf40c4548ae32e4f48e8f33eecf4ed0f1447dae67425fd7b9d56ca8176ec620",
  txHash: "0xdbf40c4548ae32e4f48e8f33eecf4ed0f1447dae67425fd7b9d56ca8176ec620"
}

// define request
const herokuAPIRequest = Functions.makeHttpRequest({
  url: `https://blockusign-05843e86beea.herokuapp.com/generate-pdf`,
  method: `POST`,
  headers: { "Content-Type": "application/json" },
  data: sourceData,
})

// define response
const herokuResponse = await herokuAPIRequest;

const outputData = []

if (!herokuResponse.error) {
  outputData.push(herokuResponse.data['data']['document'])
  console.log("outputData", herokuResponse.data)
  console.log("outputData", outputData)
} else {
  console.log("API Error", herokuResponse.message, herokuResponse.code)
}

return Functions.encodeString(outputData); 