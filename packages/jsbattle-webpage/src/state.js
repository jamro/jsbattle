export default {
  api: "./",
  navi: {
    section: "LOADING",
    page: "LOADING",
    pageData: {}
  },
  simSpeed: 1,
  qualitySettings: 'auto',
  battle: {
    battleSet: null,
    teamMode: false,
    aiDefList: null,
    quickBattleTank: null,
    rngSeed: 0,
    shareLink: null,
    modifier: null
  },
  codeRepository: {
    tankList: []
  },
  editor: {
    originalCode: "",
    tankName: "",
    unsavedCode: ""
  },
  challenges: {
    list: []
  },
  currentChallenge: {
    id: null,
    level: null,
    name: null,
    description: null,
    showInfo: false,
    battleSet: null,
    aiDefList: null,
    teamMode: false,
    result: null,
    modifier: null
  },
  errorMessage: null
};
