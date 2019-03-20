const express = require('express');
const {postgraphile} = require('postgraphile');

const app = express();

app.use(
  postgraphile(
    'postgres://forum_postgraphile:s883ZabA9D8jVBXd@139.162.212.109:5432/forum',
    'forum',
    {
      pgDefaultRole: 'forum_anonymous',
      dynamicJson: true,
      ignoreRBAC: false,
      showErrorStack: false,
      jwtSecret: '4k8ZmdPLxWK71j8F',
      jwtPgTypeIdentifier: 'forum.json_web_token',
      graphqlRoute: '/',
      enableCors: true,
    },
  ),
);

app.listen(5000, () => {
  console.log('listening on port 5000');
});
