const Event = require("../models/event.model");

exports.record = async (evt) => {
  const e = new Event(evt);
  await e.save();
  return e;
};

exports.funnelStats = async () => {
  return Event.aggregate([
    { $group: { _id: "$eventType", count: { $sum: 1 } } }
  ]);
};
