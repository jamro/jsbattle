import assert from "assert";

module.exports = function() {

  describe('Docs', async () => {

    this.visitedLinks = [];
    this.unvisitedLinks = [];

    it('should have all links working', async () => {
      let self = this;
      async function visit(url) {
        self.visitedLinks.push(url);
        // open url
        await self.page.goto(url);
        let title = await self.page.title();
        let html = await self.page.content();
        let size = (html.length/1000);

        // fetch links
        let links = await self.page.evaluate(() => {
          const allLinks = document.querySelectorAll('a');
          return Object.values(allLinks).map(el => el.href.replace(/\?.*$/, '')); // ignore anchor links in websites
        });
        links = links.filter((el, index, list) => {
          return (new RegExp(self.config.BASE_URL)).test(el)
            && list.indexOf(el) === index
            && self.visitedLinks.indexOf(el) === -1
            && self.unvisitedLinks.indexOf(el) === -1;
        })

        self.mlog.log(`size: ${size.toFixed(2)}KB, \tnew links: ${links.length}, \tURL: ${url}`);
        while(links.length) {
          self.unvisitedLinks.push(links.pop());
        }

        assert(size > 1, `Page ${url} is not empty. Current size: ${size.toFixed(2)}KB`);

        if(self.unvisitedLinks.length > 0) {
          await visit(self.unvisitedLinks.pop());
        }
      }

      await visit(this.config.BASE_URL + "docs/", this.page, this.visitedLinks, this.unvisitedLinks);
      assert(this.visitedLinks.length > 10, `Amount of links in docs is more than ten (${this.visitedLinks.length})`)

    });

  });
}
