// No authentication. demonstrate POST with data in body

const sourceData = {
  source: "https://en.wikipedia.org/wiki/United_Kingdom",
  format: "A4",
  media: "print"
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
