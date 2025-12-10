exports.checkEligibility = async (payload) => {
  const reasons = [];
  let eligible = true;

  if (payload.dob) {
    const age = new Date().getFullYear() - new Date(payload.dob).getFullYear();
    if (age < 18) {
      eligible = false;
      reasons.push("Underage");
    }
  }

  if (payload.country === "NK" || payload.country === "IR") {
    eligible = false;
    reasons.push("Unsupported country");
  }

  if (payload.docType === "temporary_id") {
    eligible = false;
    reasons.push("Temporary ID not accepted");
  }

  return { eligible, reasons };
};
