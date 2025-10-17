const http = require('http');

console.log('🧪 Running tests...\n');

// Test 1: Health Check
function testHealthCheck() {
    return new Promise((resolve, reject) => {
        http.get('http://localhost:3000/health', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const response = JSON.parse(data);
                if (response.status === 'OK') {
                    console.log('✅ Health check passed');
                    resolve();
                } else {
                    console.log('❌ Health check failed');
                    reject();
                }
            });
        }).on('error', reject);
    });
}

// Test 2: Get Tasks
function testGetTasks() {
    return new Promise((resolve, reject) => {
        http.get('http://localhost:3000/tasks', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const response = JSON.parse(data);
                if (response.tasks && Array.isArray(response.tasks)) {
                    console.log('✅ Get tasks passed');
                    resolve();
                } else {
                    console.log('❌ Get tasks failed');
                    reject();
                }
            });
        }).on('error', reject);
    });
}

// Run all tests
async function runTests() {
    try {
        await testHealthCheck();
        await testGetTasks();
        console.log('\n🎉 All tests passed!');
        process.exit(0);
    } catch (error) {
        console.log('\n💥 Tests failed!');
        console.error(error);
        process.exit(1);
    }
}

// Wait a bit for server to start, then run tests
setTimeout(runTests, 1000);