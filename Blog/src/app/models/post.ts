export interface IPost {
  _id: string;
  title: string;
  author: string;
  date: string;
  imagePath: string;
  content: string;
  comments: {
    [index: number]: {
      _id: string;
      author: string;
      content: string;
      date: string
    }
  };
}
