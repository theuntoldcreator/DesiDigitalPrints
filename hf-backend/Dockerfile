# Use a lightweight Alpine image
FROM alpine:latest

# Install necessary dependencies
RUN apk add --no-cache \
    unzip \
    ca-certificates \
    openssh

# Define PocketBase version
ARG PB_VERSION=0.22.14

# Download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# Expose the default Hugging Face port
EXPOSE 7860

# Start PocketBase on port 7860 and listen on all interfaces
# The --dir flag ensures data is stored in the /pb/pb_data directory
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:7860", "--dir=/pb/pb_data"]
