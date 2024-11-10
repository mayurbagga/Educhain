export const warpcastSchemas = [

    {
        name: "FETCH_USERS_DETAILS_BY_GIVEN_USERNAME",
        description:
            "This function gets users by given username. API is expecting username string. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have username key which is nothing but identifier for users. Those user will have matching username, will come`,
            properties: {
                username: {
                    type: "string",
                    description:
                        "A identifier for user.",
                },
            },
            required: ["username"],
        },
    },
    {
        name: "FETCH_USER_DETAILS_BY_GIVEN_FID",
        description:
            "This function gets user by given fid. API is expecting fid. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have fid key which is nothing but identifier for user. Those user will have matching fid, will come`,
            properties: {
                fid: {
                    type: "string",
                    description:
                        "A identifier for user.",
                },
            },
            required: ["fid"],
        },
    },
    {
        name: "FOLLOWERS_BY_FID",
        description:
            "This function gets followers by given fid. API is expecting fid. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have fid key which is nothing but identifier for user. Those user will have matching fid, will come`,
            properties: {
                fid: {
                    type: "string",
                    description:
                        "A identifier for user.",
                },
            },
            required: ["fid"],
        },
    },
    {
        name: "POST_THE_CAST",
        description:
            "This function posts a cast behalf of user. API is expecting uuid and text string. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have uuid  which is nothing but identifier for signedin users.`,
            properties: {
                uuid: {
                    type: "string",
                    description:
                        "A identifier for user.",
                },
            },
            required: ["uuid"],
        },
    },
    {
        name: "FETCH_USER_STORAGE_ALLOCATION_BY_GIVEN_USERNAME",
        description:
            "This function gets user storage allocation by given username. API is expecting username string. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have username key which is nothing but identifier for users. Those user will have matching username, will come`,
            properties: {
                username: {
                    type: "string",
                    description:
                        "A identifier for user.",
                },
            },
            required: ["username"],
        },
    },
    {
        name: "FETCH_USER_STORAGE_USAGE_BY_GIVEN_USERNAME",
        description:
            "This function gets user storage usage by given username. API is expecting username string. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.",
        parameters: {
            type: "object",
            description: `Object will have username key which is nothing but identifier for users. Those user will have matching username, will come`,
            properties: {
                username: {
                    type: "string",
                    description:
                        "A identifier for user.",
                },
            },
            required: ["username"],
        },
    },
];

