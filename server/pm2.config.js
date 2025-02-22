module.exports = {
    apps: [
        {
            name: "admin-api",
            script: "admin.js",
            cwd: "./",
            instances: 1,  // Single instance since it runs multiple APIs on one port
            exec_mode: "fork",
            env: {
              NODE_ENV: "production",
              PORT: 3001,
            },
          },
      
      {
        name: "chat",
        script: "chat.js",
        cwd: "./",
        env: { PORT: 5000 }
      },
      {
        name: "index",
        script: "index.js",
        cwd: "./",
        env: { PORT: 3000 }
      },
      {
        name: "ins_plan",
        script: "ins_plan.js",
        cwd: "./",
        env: { PORT: 3002 }
      },
      {
        name: "lifestyle_admin",
        script: "lifestyle_admin.js",
        cwd: "./",
        env: { PORT: 3003 }
      },
      {
        name: "lifestyle",
        script: "lifestyle.js",
        cwd: "./",
        env: { PORT: 5001 }
      },
      {
        name: "plans",
        script: "plans.js",
        cwd: "./",
        env: { PORT: 9000 }
      },
      {
        name: "sum",
        script: "sum.js",
        cwd: "./",
        env: { PORT: 8010 }
      },
      
    ]
  };