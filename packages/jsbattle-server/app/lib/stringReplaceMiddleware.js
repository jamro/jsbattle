const hijackResponse = require('hijackresponse');
const Transform = require('stream').Transform;
const escapeStringRegexp = require('escape-string-regexp');

const defaultOptions = {
  contentTypeFilterRegexp: /^text\/|^application\/json$|^application\/xml$/,
}

module.exports = (replacements, options = defaultOptions ) => (req, res, next) => {
  hijackResponse(res, (err, res) => {
    const contentType = res.get('content-type');
    if (options.contentTypeFilterRegexp.test(contentType)) {
      if (err) {
        res.unhijack();
        return next(err);
      }
      res.removeHeader('Content-Length');
      res
        .pipe(stringReplaceStream(replacements))
        .pipe(res);
    } else {
      return res.unhijack();
    }
  });
  next();
};

function stringReplaceStream(replacements) {
    const replacers = [];
    const replace = (haystack, replacers, replaceBefore) => {
        const getBody = (haystack) => haystack.slice(0, replaceBefore);
        const tail = haystack.slice(replaceBefore);
        replacers.forEach((replacer) => {
            if (!replacer.matcher.test(haystack)) {
                return;
            }
            haystack = getBody(haystack).replace(replacer.matcher, replacer.replace) + tail;
        });
        return [
          getBody(haystack),
          tail
        ];
    };
    let tail = '';
    let maxSearchLength = 0;

    Object.keys(replacements)
        .sort((str1, str2) => str2.length - str1.length)
        .forEach((search) => {
            maxSearchLength = Math.max(maxSearchLength, search.length);
            replacers.push({
                matcher: new RegExp(escapeStringRegexp(search), 'gmi'),
                replace: replacements[search]
            });
        });

    function transform(buf, enc, cb) {
        const replaceBefore = maxSearchLength * 2;
        let haystack = tail + buf.toString('utf8');
        let body = '';

        if (haystack.length + 2 < maxSearchLength * 3) {
            tail = haystack;
            cb(null, '');
            return;
        }

        [
          body,
          tail
        ] = replace(haystack, replacers, replaceBefore);

        cb(null, body);
    }

    function flush(cb) {
        if (tail) {
            const result = replace(tail, replacers, tail.length);
            this.push(result[0]);
        }
        cb();
    }

    return new Transform({
        transform: transform,
        flush: flush
    });
}
