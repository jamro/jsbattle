
module.exports = function(ctx) {
  let page = ctx.params.page || 1;
  let pageSize = ctx.params.pageSize || 10;
  let total = this.ranktable.getLength();
  let totalPages = Math.ceil(total/pageSize);
  let offset = (page-1)*pageSize;
  let rows = this.ranktable.getData().slice(offset, offset+pageSize);
  return {
    rows,
    page,
    pageSize,
    total,
    totalPages
  }
}
