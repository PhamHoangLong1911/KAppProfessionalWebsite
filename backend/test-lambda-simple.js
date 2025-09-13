const { handler } = require('./dist/lambda');

// Simple test without database connection
const testBasic = {
    httpMethod: 'GET',
    path: '/',
    headers: {
        'Content-Type': 'application/json'
    },
    body: null,
    isBase64Encoded: false,
    requestContext: {
        requestId: 'test-request',
        stage: 'test'
    }
};

const testContext = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'test-function',
    functionVersion: '1.0',
    invokedFunctionArn: 'test-arn',
    memoryLimitInMB: '512',
    awsRequestId: 'test-request-id',
    logGroupName: 'test-log-group',
    logStreamName: 'test-log-stream',
    getRemainingTimeInMillis: () => 30000,
    done: () => {},
    fail: () => {},
    succeed: () => {}
};

console.log('Testing Lambda Basic Route...');
handler(testBasic, testContext, (error, result) => {
    if (error) {
        console.error('❌ Basic Route Error:', error);
    } else {
        console.log('✅ Basic Route Response:', JSON.stringify(result, null, 2));
    }
    process.exit(0);
});
