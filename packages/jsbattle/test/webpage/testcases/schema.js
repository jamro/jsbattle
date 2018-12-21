import assert from "assert";

module.exports = function() {

  async function checkSchemaUrl(self, url) {
    await self.createNewPage();
    var response;
    let handler = (rsp) => {
      self.page.removeListener('response', handler);
      response = rsp;
    }

    self.page.on('response', handler);
    await self.page.goto(url);

    assert.equal(200, response.status());
    let contentType = response.headers()['content-type'];
    assert(contentType.search('json') != -1, "JSON content type")
  }

  describe('Schema', () => {

    it('should provide UBD schema v1', async () => {
      await checkSchemaUrl(this, this.config.BASE_URL + "schema/ubd-schema-v1.json");
    });

    it('should provide UBD schema v2', async () => {
      await checkSchemaUrl(this, this.config.BASE_URL + "schema/ubd-schema-v2.json");
    });

  });

}
