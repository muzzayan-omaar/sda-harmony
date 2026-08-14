// features/admin/types/admin.ts (new file)
export interface PendingSong {
  id: string;
  title: string;
  audioUrl: string;
  createdAt: string;
  choir: { id: string; name: string };
}

export interface PendingAlbum {
  id: string;
  title: string;
  coverUrl: string | null;
  createdAt: string;
  choir: { id: string; name: string };
}

export interface PendingChoirVerification {
  id: string;
  createdAt: string;
  choir: { id: string; name: string; ownerId: string };
}

export interface PendingReview {
  songs: PendingSong[];
  albums: PendingAlbum[];
  choirVerifications: PendingChoirVerification[];
}