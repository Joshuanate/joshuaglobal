export type QuestionAnswer = {
  id: string;
  body: string;
  authorName: string;
  isOfficial: boolean;
  votes: number;
  createdAt: string;
};

export type Question = {
  id: string;
  slug: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  answers: QuestionAnswer[];
  isAnswered: boolean;
  isApproved: boolean;
  isFeatured: boolean;
  askedBy: string;
  createdAt: string;
  updatedAt: string;
};
