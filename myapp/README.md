# Hospital Management System - Automated Testing

This project contains automated Selenium tests for the Hospital Management System, configured to run in Jenkins with Docker.

## Prerequisites

- Jenkins server with Docker plugin installed
- Docker installed on Jenkins server
- GitHub repository access
- Node.js 18+ (for local development)

## Setup Instructions

### 1. Local Development

To run tests locally:

```bash
# Install dependencies
npm install

# Run tests
npm test
```

### 2. Docker Setup

To run tests using Docker:

```bash
# Build and run tests
docker-compose up tests

# Or build manually
docker build -t hospital-management-tests .
docker run --shm-size=2g hospital-management-tests
```

### 3. Jenkins Pipeline Setup

1. **Install Required Jenkins Plugins:**
   - Docker Pipeline
   - HTML Publisher
   - Git

2. **Configure Jenkins Pipeline:**
   - Create a new Pipeline job
   - Configure Git repository
   - Use the Jenkinsfile from this repository

3. **Pipeline Stages:**
   - Checkout: Clones code from GitHub
   - Build: Creates Docker image
   - Test: Runs Selenium tests
   - Cleanup: Removes Docker images

## Test Structure

The tests are located in the `tests/` directory and include:

- Login functionality
- Doctor management
- Patient management
- Appointment scheduling

## Configuration

### Environment Variables

- `NODE_ENV`: Set to 'test' for test environment
- `DISPLAY`: Set to ':99' for headless Chrome

### Docker Configuration

- Uses Node.js 18 base image
- Includes Chrome and ChromeDriver
- Configured for headless testing
- Shared memory size: 2GB

## Troubleshooting

### Common Issues

1. **Chrome crashes in Docker:**
   - Ensure `--shm-size=2g` is set
   - Check Chrome version compatibility

2. **Tests timeout:**
   - Increase Jest timeout in test configuration
   - Check network connectivity

3. **Element not found:**
   - Verify element selectors
   - Check page load timing

### Logs

Test results and logs are available in:
- Jenkins build console
- Docker container logs
- Screenshots on test failure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Submit a pull request

## License

This project is licensed under the MIT License.
