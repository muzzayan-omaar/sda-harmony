// features/content/types/content.ts (new file)
export type ContentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Album {
  id: string;
  title: string;
  coverUrl: string | null;
  genre: string | null;
  status: ContentStatus;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  audioUrl: string;
  duration: number | null;
  status: ContentStatus;
  albumId: string | null;
  createdAt: string;
  choir?: { id: string; name: string; logoUrl?: string | null; isVerified?: boolean };
}

export interface ChoirProfile {
  id: string;
  name: string;
  bio: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  location: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  isVerified: boolean;
}

export interface UploadSignature {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}