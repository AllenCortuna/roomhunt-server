

export const sendErr = (res, err) => {
  res.status.json({ success: false, err });
};
