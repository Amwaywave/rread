const mockData = {
  posts: [
    {
      title: '第一个标题',
      content: '内容',
      date: new Date(),
      tagList: [
        {
          id: 1,
          name: '新闻资讯'
        }
      ]
    }
  ]
}

export const getPosts = () => {
  return mockData.posts
}
