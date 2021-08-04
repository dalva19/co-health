const healthcareMemberVerification = (profileType) => {
  if (profileType !== "healthcare member") {
    return res
      .status(401)
      .send("You must be a healthcare member to make an offer.");
  }
};

module.exports.profileType;
