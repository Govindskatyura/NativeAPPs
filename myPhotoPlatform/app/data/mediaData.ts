const mediaData = Array.from({ length: 200 }, (_, index) => ({
  id: (index + 1).toString(),
  type: 'image',
  source: `https://picsum.photos/200/350?random=${index + 10}`,
  isVideo: false,
  caption: `Caption for media ${index + 1}`,
  username: `user${index + 1}`,
}));

export default mediaData;
