export interface Issue {
  node: {
    title: String;
    url: String;
    body: String;
    state: String;
    comments: Comment;
    createdAt: String;
  };
}
