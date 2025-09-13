const { handler } = require('./dist/lambda');

// Test the Lambda function locally
const testHealthCheck = {
    httpMethod: 'GET',
    path: '/health',
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

const testLogin = {
    httpMethod: 'POST',
    path: '/api/auth/login',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'admin@kapptech.com',
        password: 'Admin123!@#'
    }),
    isBase64Encoded: false,
    requestContext: {
        requestId: 'test-login-request',
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

console.log('Testing Lambda Health Check...');
handler(testHealthCheck, testContext, (error, result) => {
    if (error) {
        console.error('❌ Health Check Error:', error);
    } else {
        console.log('✅ Health Check Response:', result);
    }
    
    console.log('\nTesting Lambda Login...');
    handler(testLogin, testContext, (error, result) => {
        if (error) {
            console.error('❌ Login Error:', error);
        } else {
            console.log('✅ Login Response:', result);
        }
        
        console.log('\nLambda testing completed!');
        process.exit(0);
    });
});
