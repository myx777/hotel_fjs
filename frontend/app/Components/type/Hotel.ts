export interface HotelCardProps {
  id: number;
  title: string;
  description: string;
}

export interface HotelsResponse {
  hotels: HotelCardProps[];
  totalPages: number;
}
