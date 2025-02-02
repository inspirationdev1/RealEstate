import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "Swiper";

import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import whatsappLogo from "../images/whatsapp.png";                                              
export default function Listing() {
  // SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);                                              
  const [loading, setLoading] = useState(false);                                              
  const [error, setError] = useState(false);                                              
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);                                              
  const params = useParams();                                              
  const { currentUser } = useSelector((state) => state.user);
  const [mobileno, setMobileno] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        const userRef = data.userRef;
        console.log("userRef", userRef);
        const resListingUser = await fetch(`/api/user/${userRef}`);
        const dataListingUser = await resListingUser.json();
        console.log("dataListingUser", dataListingUser);
        setMobileno(dataListingUser.mobileNo);
        console.log("Mobileno", mobileno);
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>

          <div
            className="fixed-bottom right-100 p-3"
            style={{ zIndex: "6", left: "initial" }}
          >
            <div className="w-58 flex flex-col items-center mb-12 border-black border-2 rounded-xl p-2 ">
              {" "}
              <p>Contact Owner</p>
              {/* <a
                href="https://wa.me/+919550345573?text=Hello Hello i just saw your PROPERTY ?  "
                target="_blank"
              >
                <img src={whatsappLogo} width="60" alt="whatsapp " />
              </a> */}
              <a
                href={
                  "https://wa.me/+91" +
                  mobileno +
                  "?text=Hello Hello i just saw your PROPERTY ?  "
                }
                target="_blank"
              >
                <img src={whatsappLogo} width="60" alt="whatsapp " />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
