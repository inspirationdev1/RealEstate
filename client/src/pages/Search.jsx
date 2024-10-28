import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState("");
  const [state, setState] = useState([]);
  const [stateid, setStateid] = useState("");
  const [city, setCity] = useState([]);
  const [cityid, setCityid] = useState("");

  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
    Locationorder: "Locationdesc",
    countryid: "",
    stateid: "",
    cityid: "",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const LocationorderFromUrl = urlParams.get("Locationorder");
    const countryFromUrl = urlParams.get("countryid");
    const stateFromUrl = urlParams.get("stateid");
    const cityFromUrl = urlParams.get("cityid");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      LocationorderFromUrl ||
      countryFromUrl ||
      stateFromUrl ||
      cityFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
        Locationorder: LocationorderFromUrl || "Locationdesc",
        countryid: countryFromUrl || "",
        stateid: stateFromUrl || "",
        cityid: cityFromUrl || "",
      });
    }

    const fecthListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fecthListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleChangeDropDown = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const getcountry = async () => {
      const rescountry = await fetch("/api/country/get");
      const rescon = await rescountry.json();
      setCountry(await rescon);
    };
    getcountry();
  }, []);

  const handlecountry = (event) => {
    const getcountryid = event.target.value;
    console.log("getcountryid", getcountryid);
    setCountryid(getcountryid);
    getStateByCountry(getcountryid);
    // setFormData({
    //   ...formData,
    //   [event.target.id]: event.target.value,
    // });

    setSidebardata({
      ...sidebardata,
      countryid: event.target.value,
    });

    setCity([]);
  };
  const getStateByCountry = async (getcountryid) => {
    console.log("countryid", getcountryid);
    setCountryid(getcountryid);
    console.log("countryid", countryid);
    const resstate = await fetch(
      `/api/state/getStateByCountry/${getcountryid}`
    );

    const resst = await resstate.json();
    console.log("resst", resst);
    setState(await resst);
    setStateid("");
  };

  const handlestate = (event) => {
    const getstateid = event.target.value;
    setStateid(getstateid);
    setSidebardata({
      ...sidebardata,
      stateid: event.target.value,
    });
    getCityByState(getstateid);
  };

  const getCityByState = async (getstateid) => {
    setCityid("");
    console.log("stateid", getstateid);
    setStateid(getstateid);
    console.log("stateid", stateid);
    const rescity = await fetch(`/api/city/getCityByState/${getstateid}`);

    const rcity = await rescity.json();
    console.log("rcity", rcity);
    setCity(await rcity);
  };

  const handlecity = (event) => {
    const getcityid = event.target.value;
    setSidebardata({
      ...sidebardata,
      cityid: event.target.value,
    });
    setCityid(getcityid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    urlParams.set("Locationorder", sidebardata.Locationorder);
    urlParams.set("countryid", sidebardata.countryid);
    urlParams.set("stateid", sidebardata.stateid);
    urlParams.set("cityid", sidebardata.cityid);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <div>
            <select
              id="countryId"
              name="countryId"
              className="form-control p-2"
              onChange={(e) => handlecountry(e)}
              value={sidebardata.countryId}
            >
              <option value="">--Select Country--</option>
              {/* {country.map((getcon, index) => (
                <option key={index} value={getcon._id}>
                  {getcon.countryName}{" "}
                </option>
              ))} */}
              {Array.isArray(country) &&
                country.map((getcon, index) => (
                  <option key={index} value={getcon._id}>
                    {getcon.countryName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <select
              id="stateId"
              name="stateId"
              className="form-control p-2"
              onChange={(e) => handlestate(e)}
              value={sidebardata.stateId}
            >
              <option value="">--Select State--</option>
              {Array.isArray(state) &&
                state.map((getst, index) => (
                  <option key={index} value={getst._id}>
                    {getst.stateName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <select
              id="cityId"
              name="cityId"
              className="form-control p-2"
              onChange={(e) => handlecity(e)}
              value={sidebardata.cityId}
            >
              <option value="">--Select City--</option>
              {/* {city
                ? city.map((getcity, index) => (
                    <option key={index} value={getcity._id}>
                      {getcity.cityName}{" "}
                    </option>
                  ))
                : []} */}
              {Array.isArray(city) &&
                city.map((getcity, index) => (
                  <option key={index} value={getcity._id}>
                    {getcity.cityName}
                  </option>
                ))}
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
