import Docker from "dockerode";

const docker = new Docker(
  process.platform === "win32"
    ? { host: "host.docker.internal", port: 2375 } // Windows + Docker Desktop
    : { socketPath: "/var/run/docker.sock" }       // Linux/Mac
);

export default docker;
