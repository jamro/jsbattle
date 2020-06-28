module.exports = async function(ctx) {
  let oldItems = await this._find(ctx, {
    query: {
      expiresAt: {
        $lt: new Date()
      }
    }
  });
  oldItems = oldItems.map((r) => r.id)
  let removals = oldItems.map((id) => this._remove(ctx, { id }));
  await Promise.all(removals);
}
