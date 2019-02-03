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
    shareLink: null
  },
  codeRepository: {
    tankList: []
  },
  editor: {
    originalCode: "",
    tankName: "",
    unsavedCode: ""
  },
  currentChallenge: {
    id: null,
    battleSet: null,
    aiDefList: null,
    teamMode: false,
    result: null
  },
  errorMessage: null
};
