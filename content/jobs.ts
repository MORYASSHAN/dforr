git/*
 * Open roles shown on /careers.
 * To add a role, copy one object below and edit it. To close a role, delete it
 * or set `open: false`. Domains become filter chips automatically.
 * Each role can be linked directly as /careers#<id>.
 */

export type Job = {
  id: string;
  domain: string;
  title: string;
  location: string;
  reward: string;
  about: string;
  responsibilities: string[];
  minimum: string[];
  preferred: string[];
  stack: string[];
  open?: boolean;
};

export const jobs: Job[] = [
  {
    id: "mobile-platform-architect",
    domain: "Mobile Systems",
    title: "Staff Mobile Native & Flutter Platform Architect",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Own the primary mobile client runtime powering Maya. You will architect our 5-tab spatial shell in Flutter, integrate low-level iOS and Android platform channels, and guarantee butter-smooth 120 FPS performance across diverse physical hardware.",
    responsibilities: [
      "Architect and maintain the 5-tab core navigation shell (Explore, Events, Camera, BedRoom, Chat) with zero frame drops.",
      "Implement platform channel bridges in Swift (iOS) and Kotlin/NDK (Android) for OS-level screenshot defense and client integrity.",
      "Optimize local offline SQLite storage (sqlite_async) with sub-5ms query response for message threads and spatial feeds.",
      "Profile GPU rasterization and memory allocations across both high-end flagships and budget Android hardware.",
    ],
    minimum: [
      "4+ years building production-grade mobile applications with Flutter/Dart and native iOS (Swift) or Android (Kotlin).",
      "Deep understanding of state management architectures (Riverpod), GoRouter navigation, and reactive streams.",
      "Hands-on experience with local database modeling, SQLite optimization, and background workers.",
    ],
    preferred: [
      "Experience building custom platform channels, JNI/NDK native modules, or C++ integrations.",
      "Familiarity with Android FLAG_SECURE window flags, Apple DeviceCheck, and Play Integrity APIs.",
    ],
    stack: ["Flutter", "Dart", "Swift", "Kotlin", "Riverpod", "SQLite", "GoRouter", "Dio"],
  },
  {
    id: "graphics-shader-engineer",
    domain: "Graphics & Compute",
    title: "Lead Mobile 3D Graphics & Shader Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Build the real-time mobile graphics engine powering Maya's spatial environments and live avatars. You will write custom Metal and Vulkan fragment and compute shaders, optimizing rendering pipelines under strict mobile thermal and memory budgets.",
    responsibilities: [
      "Author hand-tuned Metal Shading Language (iOS) and Vulkan/SPIR-V (Android) fragment and compute shaders.",
      "Implement dynamic polygon Level of Detail (LOD) decimation algorithms to render 1,000+ synchronized avatars in amphitheaters.",
      "Optimize Tile-Based Deferred Rendering (TBDR) memory pipelines within a strict 64MB VRAM budget.",
      "Design real-time PBR material shaders for luxury Indian textiles including silk anisotropic sheen, velvet, and gold zardozi.",
    ],
    minimum: [
      "4+ years of professional experience in C++, Metal, Vulkan, GLSL/SPIR-V, or WebGPU.",
      "Solid grasp of mobile GPU architectures (Apple Silicon and ARM Mali TBDR) and mobile thermal dissipation limits.",
      "Demonstrated portfolio of real-time 3D rendering engines, game development, or simulation shaders.",
    ],
    preferred: [
      "Experience with tangent-space normal map baking, light probe irradiance, and mobile shadow cascades.",
      "Background in real-time cloth simulation or GPU compute kernels for physics.",
    ],
    stack: ["C++", "Metal", "Vulkan", "SPIR-V", "GLSL", "TBDR Shaders", "glTF", "WebGPU"],
  },
  {
    id: "computer-vision-ar",
    domain: "Computer Vision & AR",
    title: "Senior Computer Vision & Mobile AR Systems Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Lead the camera intelligence and augmented reality systems powering the Maya Eye camera. You will implement on-device facial tracking, full-body kinematics, and 3D Gaussian Splatting room reconstruction.",
    responsibilities: [
      "Deploy low-latency on-device face mesh tracking (468 landmarks, 52 blendshapes) via MediaPipe and CoreML.",
      "Build one-time biometric calibration algorithms estimating user body kinematics and proportions for virtual fitting.",
      "Fuse mobile camera frames with LiDAR depth sensor data to reconstruct physical rooms into visitable 3D sanctuaries.",
      "Build asset ingestion pipelines converting Snapchat Lens Studio and Camera Kit experiences into mobile runtime models.",
    ],
    minimum: [
      "3+ years in computer vision, mobile augmented reality (ARKit / ARCore), and mobile ML inference.",
      "Proficiency in C++, Python, OpenCV, and on-device model deployment (CoreML, TFLite).",
      "Strong foundational knowledge of linear algebra, projective geometry, and sensor fusion.",
    ],
    preferred: [
      "Experience with 3D Gaussian Splatting (3DGS), neural radiance fields (NeRFs), or metric photogrammetry.",
      "Familiarity with mobile NPU optimization (Apple Neural Engine, Qualcomm Hexagon).",
    ],
    stack: ["C++", "Python", "ARKit", "ARCore", "CoreML", "MediaPipe", "3DGS", "LiDAR", "OpenCV"],
  },
  {
    id: "spatial-audio-engineer",
    domain: "Distributed Systems & Audio",
    title: "Principal Real-Time Systems & Spatial Audio Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Architect the low-latency media transport backbone powering Maya's live amphitheaters and group calls. You will design multi-tier SFU media cascades synchronizing up to 1,000,000 live participants and build binaural spatial audio convolution engines.",
    responsibilities: [
      "Design and deploy multi-tier SFU fanout media pipelines using LiveKit and WebRTC across global edge nodes.",
      "Implement 15-meter spherical inverse-square acoustic dropoff (1/d²) with HRTF binaural head-shadow convolution.",
      "Deploy client-side SFrame encryption for private multi-party calls, ensuring zero media decryption on server relays.",
      "Tune network jitter buffers, packet-loss concealment (PLC), and Opus audio encoder parameters for sub-40ms latency.",
    ],
    minimum: [
      "5+ years building distributed real-time systems, WebRTC media servers, or low-latency audio/video conduits.",
      "Proficiency in Go, Rust, or C++ with production experience scaling network daemons to high concurrent volumes.",
      "Solid understanding of RTP/RTCP, WebRTC protocols, network sockets, and digital signal processing (DSP).",
    ],
    preferred: [
      "Experience with LiveKit server internals, SFrame (RFC 9605), or HRTF spatial convolution algorithms.",
      "Background in acoustic modeling, room reverberation impulse responses, and multi-region edge routing.",
    ],
    stack: ["Go", "Rust", "C++", "LiveKit", "WebRTC", "SFrame", "Opus DSP", "Redis"],
  },
  {
    id: "ai-companion-architect",
    domain: "AI & Cognition",
    title: "Lead AI & Cognitive Companion Systems Architect",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Architect Maya's autonomous cognitive companion, a lifelong conversational intelligence living in the personal BedRoom sanctuary. You will build continuous 3-tier memory graphs, low-latency streaming inference, and emotional prosody synthesis.",
    responsibilities: [
      "Architect the 3-tier cognitive memory graph: Permanent Core identity, Rolling Gist summaries, and Episodic vector recall.",
      "Deploy streaming inference pipelines on vLLM and TensorRT-LLM achieving sub-180ms Time-to-First-Token (TTFT).",
      "Build real-time duplex voice streaming with Voice Activity Detection (VAD) and interruptible conversational flow.",
      "Map conversational emotion and empathy to 40+ 3D avatar micro-expressions and circadian ambient lighting.",
    ],
    minimum: [
      "4+ years in machine learning, LLM system architecture, PyTorch, and streaming inference deployment.",
      "Hands-on experience with vector similarity databases (PostgreSQL pgvector) and cognitive memory retrieval (RAG).",
      "Production background with FastAPI, WebSockets, and asynchronous Python concurrency.",
    ],
    preferred: [
      "Experience fine-tuning low-latency conversational models with emotional prosody and cultural nuance (Hinglish).",
      "Familiarity with streaming speech-to-text (Whisper/Deepgram) and neural text-to-speech pipelines.",
    ],
    stack: ["Python", "PyTorch", "vLLM", "TensorRT-LLM", "PostgreSQL pgvector", "FastAPI", "WebSockets"],
  },
  {
    id: "cloth-physics-engineer",
    domain: "Product & Virtual Fashion",
    title: "3D Digital Couture & Real-Time Cloth Physics Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Bridge luxury fashion and real-time physical simulation for Maya's Bespoke Atelier. You will simulate authentic textile drape, fabric tension, and weave friction to give shoppers zero-return confidence during virtual try-on.",
    responsibilities: [
      "Calibrate real-time cloth simulation parameters (mass-spring / position-based dynamics) for luxury Indian and global textiles.",
      "Build automated optimization pipelines converting high-resolution CLO3D/Marvelous Designer patterns into mobile glTF assets.",
      "Collaborate with fashion designers and craft ateliers to translate physical textile tests into digital normal maps and shaders.",
      "Integrate virtual try-on models with external e-commerce partner catalogs (Amazon, Flipkart, Myntra, Meesho).",
    ],
    minimum: [
      "3+ years in 3D digital garment engineering, real-time cloth simulation, or virtual fashion pipelines.",
      "Deep expertise in CLO3D, Marvelous Designer, Blender, and real-time PBR material workflows.",
      "Strong understanding of human topology, garment rigging, skinning weights, and blendshapes.",
    ],
    preferred: [
      "Experience with real-time WebGL/WebGPU shaders or mobile graphics optimization for clothing.",
      "Knowledge of textile physical properties: warp/weft tensile strength, bending stiffness, and surface friction.",
    ],
    stack: ["CLO3D", "Marvelous Designer", "Blender", "glTF", "PBR Shaders", "Three.js / WebGPU"],
  },
  {
    id: "backend-distributed-systems",
    domain: "Backend & Core Systems",
    title: "Staff Backend & Distributed Systems Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Own the core backend services powering Maya. You will scale our 21-module modular monolith in Node.js Express 5, maintain our PostgreSQL 16 database schemas, and orchestrate high-throughput BullMQ background workers.",
    responsibilities: [
      "Maintain and scale the 21 backend modular domains (identity, graph, timeline, chat, events, lenses, monetization, etc.).",
      "Design high-concurrency PostgreSQL 16 database schemas, indexes, and queries via Prisma with zero N+1 bottlenecks.",
      "Implement Cache-Aside caching patterns and distributed state locking using Redis and Redlock.",
      "Scale BullMQ worker clusters for asynchronous media transcoding, NSFW scanning, and 24h story purges.",
    ],
    minimum: [
      "4+ years architecting and scaling production backend services in Node.js / TypeScript with PostgreSQL and Redis.",
      "Deep understanding of relational database design, query optimization, connection pooling, and ACID transactions.",
      "Production experience with WebSocket scaling (Socket.IO with Redis adapter) and message queues (BullMQ).",
    ],
    preferred: [
      "Experience with Prisma ORM, pgvector extensions, or large-scale social graph modeling.",
      "Knowledge of secure authentication protocols, Firebase Admin, and rate-limiting architectures.",
    ],
    stack: ["Node.js", "Express 5", "PostgreSQL 16", "Prisma", "Redis", "BullMQ", "Socket.IO", "Pino"],
  },
  {
    id: "security-cryptographer",
    domain: "Security & Cryptography",
    title: "Lead Security Engineer & Applied Cryptographer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Design and safeguard Maya's zero-knowledge security architecture. You will implement Messaging Layer Security (MLS) protocol ratchets with Libsodium, integrate hardware secure enclaves, and enforce OS-level anti-capture defenses.",
    responsibilities: [
      "Implement MLS (RFC 9420) group key ratcheting and X25519 identity key agreements via Libsodium.",
      "Harden client-side key storage inside Apple Secure Enclave (SEP) and Android StrongBox Keymaster.",
      "Build tamper-proof client attestation pipelines using Google Play Integrity and Apple DeviceCheck.",
      "Design multi-account sandboxing isolating up to 5 user profiles with separate encryption keys and local SQLite databases.",
    ],
    minimum: [
      "4+ years in applied cryptography, security engineering, or mobile operating system security.",
      "Deep expertise in Libsodium, X25519, AES-GCM, MLS protocol, and hardware keystores.",
      "Track record conducting cryptographic protocol audits, threat modeling, and mobile vulnerability assessments.",
    ],
    preferred: [
      "Experience with Android NDK security, iOS Swift security frameworks, or OS window compositors.",
      "Familiarity with zero-knowledge proofs, formal protocol verification, and secure enclave programming.",
    ],
    stack: ["Libsodium", "MLS RFC 9420", "C", "Rust", "Swift", "Kotlin NDK", "SEP / StrongBox"],
  },
  {
    id: "technical-artist",
    domain: "3D Art & Spatial Environments",
    title: "Principal 3D Technical Artist & Spatial Environment Architect",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Lead the 3D aesthetic and technical asset pipeline for Maya's visitable worlds and events. You will author culturally authentic 3D spatial environments, bake lighting, and establish asset budgets strictly within 25,000 polygons.",
    responsibilities: [
      "Model, texture, and light modular 3D spatial environments (amphitheaters, BedRoom sanctuaries, afterparty rooms).",
      "Enforce strict mobile triangle budgets: 25,000 polys for entire worlds, 10,000 polys for face lenses, 15,000 for body rigs.",
      "Bake high-fidelity lightmaps, ambient occlusion, and reflection probes for mobile runtime performance.",
      "Establish automated asset validation scripts verifying draw call limits, texture atlas compression, and glTF file size.",
    ],
    minimum: [
      "4+ years as a technical artist in mobile gaming, VR/AR, or real-time 3D interactive experiences.",
      "Expertise in Blender, Maya, Substance 3D, and real-time PBR material workflows.",
      "Deep understanding of real-time mobile optimization (occlusion culling, draw call batching, LOD management).",
    ],
    preferred: [
      "Experience building procedural generation tools or pipeline automation scripts in Python.",
      "Background in architectural modeling, historic Indian architectural styles, and lighting art direction.",
    ],
    stack: ["Blender", "Substance 3D", "glTF / GLB", "PBR Workflows", "Light Baking", "Unity / WebGL"],
  },
  {
    id: "cloud-sre",
    domain: "Cloud Infrastructure & SRE",
    title: "Lead Cloud Infrastructure & SRE Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Architect Maya's cloud infrastructure, edge transit relays, and deployment pipelines. You will manage Kubernetes clusters, automate infrastructure with Terraform, and guarantee high availability for live stadium-scale events.",
    responsibilities: [
      "Design multi-region edge relay topologies optimizing LiveKit media transit between Indian metros and global hubs.",
      "Automate cloud infrastructure using Terraform, Docker, and multi-cluster Kubernetes on AWS/GCP.",
      "Build comprehensive observability dashboards (Prometheus, Grafana, Pino, OpenTelemetry) with automated alerting.",
      "Conduct chaos engineering, load simulation tests for 1,000,000 concurrent WebSocket connections, and disaster recovery.",
    ],
    minimum: [
      "4+ years in DevOps, SRE, and cloud infrastructure management for high-scale, real-time distributed platforms.",
      "Deep expertise in Kubernetes, Docker, Terraform, edge networking (BGP, Anycast, TURN/STUN), and Linux kernel tuning.",
      "Experience managing multi-region databases (PostgreSQL read replicas, Redis clusters) under high throughput.",
    ],
    preferred: [
      "Experience optimizing cloud egress costs and bandwidth for live video/audio streaming.",
      "Background in automated CI/CD pipelines, canary deployments, and zero-downtime database migrations.",
    ],
    stack: ["Kubernetes", "Docker", "Terraform", "AWS", "GCP", "Prometheus", "Grafana", "OpenTelemetry"],
  },
  {
    id: "mobile-performance-qa",
    domain: "Performance & Testing",
    title: "Senior Mobile Performance & Systems QA Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Ensure unassailable reliability, battery efficiency, and frame-rate consistency across every Maya build. You will author automated test suites in Flutter Test, Maestro, and Appium, and profile frame times across a 50+ device test farm.",
    responsibilities: [
      "Build automated E2E testing pipelines using Maestro, Appium, and Flutter Driver for both iOS and Android.",
      "Set up a real-device mobile test farm measuring 120 FPS frame drops, thermal throttling, and battery consumption.",
      "Conduct automated regression testing for E2EE MLS group key transitions, SFrame calls, and FLAG_SECURE window blocking.",
      "Automate backend API and load testing using Supertest, k6, and pg-mem.",
    ],
    minimum: [
      "3+ years in mobile QA automation, performance profiling, and test infrastructure engineering.",
      "Proficiency in Dart/Flutter testing, Maestro, Appium, Python/Node.js scripting, and CI/CD pipelines (GitHub Actions).",
      "Deep familiarity with Android Systrace, Apple Instruments, and GPU performance profiling tools.",
    ],
    preferred: [
      "Experience testing real-time WebRTC audio/video applications under simulated network jitter and packet loss.",
      "Knowledge of mobile security testing and automated regression harnesses.",
    ],
    stack: ["Flutter Test", "Maestro", "Appium", "Jest", "k6", "GitHub Actions", "Android Profiler", "Instruments"],
  },
  {
    id: "fintech-creator-economy",
    domain: "Creator Economy & Payments",
    title: "Fintech & Creator Economy Systems Engineer",
    location: "Jaipur, India / Remote Available",
    reward: "Performance-Based & Milestone Rewards",
    about:
      "Build the financial engine powering Maya Coins ($1.00 USD = 100 Coins). You will design high-concurrency ticket reservation algorithms, ledger balance reconciliation, and payment gateway integrations.",
    responsibilities: [
      "Design atomic ticket reservation systems using Redis Lua scripts to eliminate race conditions during high-demand event drops.",
      "Implement double-entry transaction ledgers with cryptographic audit trails for creator balances and Maya Coins.",
      "Integrate payment gateways (Stripe, Twilio OTP, Razorpay/UPI for India) with automated fraud detection.",
      "Build creator payout automation ensuring seamless bank settlements and statutory tax compliance (TDS/GST).",
    ],
    minimum: [
      "3+ years in fintech engineering, transaction ledger design, or high-concurrency reservation systems.",
      "Mastery of Redis Lua scripting, PostgreSQL distributed transactions, and payment gateway APIs.",
      "Obsession with financial precision, idempotency keys, and automated reconciliation.",
    ],
    preferred: [
      "Experience building double-entry accounting ledgers or multi-currency financial systems.",
      "Familiarity with Indian payment regulations (RBI guidelines, recurring mandate frameworks, UPI integration).",
    ],
    stack: ["Node.js", "PostgreSQL", "Redis Lua", "Stripe", "Razorpay", "Twilio", "Prisma"],
  },
];
