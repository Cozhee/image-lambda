const AWS = require('aws-sdk')

const s3 = new AWS.S3()

exports.handler = async (event) => {
    
    const bucketName = event.Records[0].s3.bucket.name
    const key = event.Records[0].s3.object.key
    
    const obj = {
        Bucket: bucketName,
        Key: key
    }
    
    const imagesObj = {
        Bucket: bucketName,
        Key: 'images.json'
    }

    const object = await s3.getObject(obj).promise()
    const images = await s3.getObject(imagesObj).promise()
    
    const imgData = images.Body.toString()
    
    const dataArr = []
    dataArr.push(imgData)
    const newImageData = {
        size: obj.ContentLength,
        type: 'application/json',
        name: obj.ETag
    }
    dataArr.push(newImageData)
   
    const theKey = "images.json"
    
    const stuff = [
  { size: 83, type: "application/json", name: "ada6f25c313c6c9249c23395c510a02b"},
  { size: 90, type: "application/json", name: "ce1d0ada98c2ad6afa2110ae5e89302e"}
]
    
    const putObject = (myBucket, key, body,contentType) =>
      s3.putObject({
        Bucket: myBucket,
        Key: key,
        Body: JSON.stringify(body),
        ContentType: contentType
    }).promise()

    
    putObject(bucketName, theKey, stuff, "application/json")
    
    // TODO implement
    const payload = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return payload;
};

