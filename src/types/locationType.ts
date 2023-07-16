type LocationInfoType = {
  id: string;
  name: string;
  display_phone: string;
  location: {
    display_address: string[];
  };
  url: string;
  is_closed: boolean;
  image_url: string;
};

export default LocationInfoType;
