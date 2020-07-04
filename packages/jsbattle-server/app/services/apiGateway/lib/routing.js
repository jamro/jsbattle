module.exports = {
  public: {

    /**
     * @swagger
     * /api/profile:
     *  get:
     *    tags:
     *      - account
     *    description: Information about current user
     *    responses:
     *      '200':
     *        description: a successfull response
     */
    "GET profile": "auth.whoami",

    /**
     * @swagger
     * /api/authMethods:
     *  get:
     *    tags:
     *      - account
     *    description: List of supported authentication methods
     *    responses:
     *      '200':
     *        description: a successfull response
     */
    "GET authMethods": "auth.getAuthMethods",

    /**
     * @swagger
     * /api/leaguePreview:
     *  get:
     *    tags:
     *      - league
     *    description: history of recent league battles
     *    responses:
     *      '200':
     *        description: a successfull response
     */
    "GET leaguePreview": "league.getHistory",

    /**
     * @swagger
     * /api/leaguePreview/replay/{battleId}:
     *  get:
     *    tags:
     *      - league
     *    description: replay of league battle
     *    parameters:
     *      - in: path
     *        name: battleId
     *        description: ID of the battle
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '404':
     *        description: battle with provided Id does not exist
     */
    "GET leaguePreview/replay/:id": "battleStore.get"
  },
  user: {

    /**
     * @swagger
     * /api/user/initData:
     *  patch:
     *    tags:
     *      - account
     *    description: user data used during registration to transit progress from un registered to registered user
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              username:
     *                type: string
     *              displayName:
     *                type: string
     *              challenges:
     *                type: array
     *                items:
     *                  type: object
     *                  properties:
     *                    challengeId:
     *                      type: string
     *                    completed:
     *                      type: boolean
     *                    code:
     *                      type: string
     *              scripts:
     *                type: array
     *                items:
     *                  type: object
     *                  properties:
     *                    scriptName:
     *                      type: string
     *                    code:
     *                      type: string
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '422':
     *        description: user already registered
     *    security:
     *      - oauth_default: []
     */
    "PATCH initData": "userStore.register",

    /**
     * @swagger
     * /api/user/scripts:
     *  get:
     *    tags:
     *      - scripts
     *    description: list all scripts of current user
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *    security:
     *      - oauth_default: []
     */
    "GET scripts": "scriptStore.listUserScripts",

    /**
     * @swagger
     * /api/user/scripts/{scriptId}:
     *  get:
     *    tags:
     *      - scripts
     *    description: a script owned by currrent user
     *    parameters:
     *      - in: path
     *        name: scriptId
     *        description: ID of the script
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '404':
     *        description: script not found
     *    security:
     *      - oauth_default: []
     */
    "GET scripts/:id": "scriptStore.getUserScript",

    /**
     * @swagger
     * /api/user/scripts:
     *  post:
     *    tags:
     *      - scripts
     *    description: create a new script owned by currrent user.
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '422':
     *        description: script limit exceeded
     *    security:
     *      - oauth_default: []
     */
    "POST scripts": "scriptStore.createUserScript",

    /**
     * @swagger
     * /api/user/scripts/{scriptId}:
     *  patch:
     *    tags:
     *      - scripts
     *    description: update a script owned by currrent user
     *    parameters:
     *      - in: path
     *        name: scriptId
     *        description: ID of the script
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/components/schemas/Script"
     *          examples:
     *            Script:
     *              $ref: "#/components/examples/Script"
     *      description: Script object to be updated
     *      required: true
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '404':
     *        description: script not found
     *    security:
     *      - oauth_default: []
     */
    "PATCH scripts/:id": "scriptStore.updateUserScript",

    /**
     * @swagger
     * /api/user/scripts/{scriptId}:
     *  delete:
     *    tags:
     *      - scripts
     *    description: remove a script owned by currrent user
     *    parameters:
     *      - in: path
     *        name: scriptId
     *        description: ID of the script
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '404':
     *        description: script not found
     *    security:
     *      - oauth_default: []
     */
    "DELETE scripts/:id": "scriptStore.deleteUserScript",

    /**
     * @swagger
     * /api/user/challenges:
     *  get:
     *    tags:
     *      - challenges
     *    description: challenges of current user
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *    security:
     *      - oauth_default: []
     */
    "GET challenges": "challenges.listUserChallenges",

    /**
     * @swagger
     * /api/user/challenges/{challengeId}:
     *  get:
     *    tags:
     *      - challenges
     *    description: specific challenge of  current user
     *    parameters:
     *      - in: path
     *        name: challengeId
     *        description: ID of the challenge
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '404':
     *        description: challenge not found
     *    security:
     *      - oauth_default: []
     */
    "GET challenges/:challengeId": "challenges.getUserChallenge",

    /**
     * @swagger
     * /api/user/challenges/{challengeId}:
     *  patch:
     *    tags:
     *      - challenges
     *    description: update specific challenge of  current user
     *    parameters:
     *      - in: path
     *        name: challengeId
     *        description: ID of the challenge
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/components/schemas/Challenge"
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '404':
     *        description: challenge not found
     *    security:
     *      - oauth_default: []
     */
    "PATCH challenges/:challengeId": "challenges.updateUserChallenge",

    /**
     * @swagger
     * /api/user/league:
     *  get:
     *    tags:
     *      - league
     *    description: league summary for current user
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *    security:
     *      - oauth_default: []
     */
    "GET league/": "league.getLeagueSummary",

    /**
     * @swagger
     * /api/user/league/replay/{battleId}:
     *  get:
     *    tags:
     *      - league
     *    description: replay of league battle
     *    parameters:
     *      - in: path
     *        name: battleId
     *        description: ID of the battle
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '404':
     *        description: battle with provided Id does not exist
     *    security:
     *      - oauth_default: []
     */
    "GET league/replay/:id": "battleStore.get",

    /**
     * @swagger
     * /api/user/league/submission:
     *  get:
     *    tags:
     *      - league
     *    description: current user submission to the league
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *    security:
     *      - oauth_default: []
     */
    "GET league/submission": "league.getUserSubmission",

    /**
     * @swagger
     * /api/user/league/ranktable:
     *  get:
     *    tags:
     *      - league
     *    description: rank table slice for current user
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *    security:
     *      - oauth_default: []
     */
    "GET league/ranktable": "league.getUserRankTable",

    /**
     * @swagger
     * /api/user/league/scripts/{scriptId}:
     *  get:
     *    tags:
     *      - league
     *    description: script from submission to the league
     *    parameters:
     *      - in: path
     *        name: scriptId
     *        description: ID of the script
     *        required: true
     *        schema:
     *          $ref: "#/components/schemas/entityId"
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *      '404':
     *        description: script not found
     *    security:
     *      - oauth_default: []
     */
    "GET league/scripts/:id": "league.getScript",

    /**
     * @swagger
     * /api/user/league/submission:
     *  patch:
     *    tags:
     *      - league
     *    description: join or re-join the league by current user
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              scriptId:
     *                type: string
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *    security:
     *      - oauth_default: []
     */
    "PATCH league/submission": "league.joinLeague",

    /**
     * @swagger
     * /api/user/league/submission:
     *  delete:
     *    tags:
     *      - league
     *    description: leave the league by current user
     *    responses:
     *      '200':
     *        description: a successfull response
     *      '401':
     *        description: not authorized
     *    security:
     *      - oauth_default: []
     */
    "DELETE league/submission": "league.leaveLeague",
  },
  admin: {
    "PATCH users/:id": "userStore.update",
    "GET users": "userStore.list",
    "GET users/:id/summary": "stats.getUserSummary",
    "GET sessions": "activityMonitor.listActiveSessions",
    "PATCH scripts/:id": "scriptStore.update",
    "GET scripts": "scriptStore.list",
    "PATCH battles/:id": "battleStore.update",
    "GET battles": "battleStore.list",
    "GET league": "league.listRankTable",
    "GET ubdPlayer/info": "ubdPlayer.getInfo",
    "GET info": "node.getInfo",
    "GET dashboard": "stats.getSummary",
  }
}
