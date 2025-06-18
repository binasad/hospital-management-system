# Start with a Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# --- Install Google Chrome and other dependencies ---
# The following commands are for Debian-based systems (like the python:3.9-slim image)
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Google Chrome Stable
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable

# --- Install ChromeDriver ---
# Find the latest stable chromedriver version from https://googlechromelabs.github.io/chrome-for-testing/
# We'll use a specific version for stability, e.g., 126.0.6478.63
RUN wget -O /tmp/chromedriver.zip https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/126.0.6478.63/linux64/chromedriver-linux64.zip \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    # The new chromedriver is in a nested folder, so we move it
    && mv /usr/local/bin/chromedriver-linux64/chromedriver /usr/local/bin/chromedriver \
    && chmod +x /usr/local/bin/chromedriver \
    && rm /tmp/chromedriver.zip

# Copy your requirements file and install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your test code into the container
COPY . .

# Set display for headless Chrome
ENV DISPLAY=:99

# Command to run your tests (optional, as Jenkins will specify this)
# CMD ["python", "your_test_runner_script.py"] 