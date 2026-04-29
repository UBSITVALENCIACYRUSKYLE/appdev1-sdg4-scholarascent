export interface OpenLibrarySearchResponse {
    numFound: number;
    start: number;
    docs: OpenLibraryBook[];
  }
  
  export interface OpenLibraryBook {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
    subject?: string[];
    number_of_pages_median?: number;
    ratings_average?: number;
    edition_count?: number;
    language?: string[];
  }