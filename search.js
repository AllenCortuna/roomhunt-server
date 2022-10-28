const bookings = await Booking.find({
  $or: [
    { start: { $gte: from_date, $lte: to_date } },
    {
      end: { $gte: from_date, $lte: to_date },
    },
    {
      $and: [{ start: { $lte: from_date } }, { end: { $gte: to_date } }],
    },
  ],
}).select("room");


    // const filterd = await Room.find({
    //   $and: [
    //     { $or: [{ name: req.query.keyword }, { description: req.query.keyword }] },
    //     { numOfBeds: req.query.numOfBeds },
    //     { category: req.query.roomType }
    //   ]
    // });
  $or: [
    { checkInDate: { $gte: checkInDate, $lte: checkOutDate} },
    {
      checkOutDate: { $gte: checkInDate, $lte: checkOutDate },
    },
    {
      $and: [{ checkInDate: { $lte: checkInDate } }, { checkOutDate: { $gte: checkOutDate } }],
    },
  ],
