import OfferAlert from "./OfferAlert";

const OfferAlerts = ({ request }) => {
  return (
    <>
      {request.offers.map((offer, i) => (
        <OfferAlert offer={offer} key={i} request={request} />
      ))}
    </>
  );
};

export default OfferAlerts;
