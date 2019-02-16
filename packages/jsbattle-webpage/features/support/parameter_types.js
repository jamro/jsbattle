const { defineParameterType } = require('cucumber');

defineParameterType({
    name: 'stringList',
    regexp: /\[([^\]]*)\]/,
    type: Array,
    useForSnippets: false,
    transformer: (txt) =>  {
      return txt
        .split(",")
        .map((el) => el.replace(/\s*$/, "").replace(/^\s*/, ""));
    }
});
