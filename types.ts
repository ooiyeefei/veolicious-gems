
export interface ContentCalendarDay {
  day: number;
  date: string;
  platform: string;
  caption: string;
  images: string[];
  video_url: string;
  video_duration: number;
}

export interface ApiResponse {
  business_name: string;
  content_calendar: ContentCalendarDay[];
}

export interface Toast {
    message: string;
    type: 'success' | 'error';
}
