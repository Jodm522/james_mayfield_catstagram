module.exports = {
    
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
        ".*\\.(vue)$": "@vue/vue3-jest",
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
     },
};
