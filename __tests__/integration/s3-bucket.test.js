const {
    describe,
    it,
    expect,
    beforeAll,
    afterAll
} = require('@jest/globals')

const { S3 } = require('../../src/factory')
const { main } = require('../../src/index')
describe('Testing AWS Services offline with LocalStack', () => {

    const bucketConfig = {
        Bucket: 'test'
    }

    beforeAll(async () => {
        await S3.createBucket(bucketConfig).promise()
    })

    afterAll(async () => {
        await S3.deleteBucket(bucketConfig).promise()
    })

    it('Should list an array with a S3 bucket', async () => {
        const expected = bucketConfig.Bucket
        const response = await main()
        const { allBuckets: { Buckets } } = JSON.parse(response.body)
        const { Name } = Buckets.find(({ Name }) => Name === expected)
        expect(Name).toStrictEqual(expected)
        expect(response.statusCode).toStrictEqual(200)
    })
})