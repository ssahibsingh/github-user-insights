
# Github User Insights

A Next.js app for Github Insights of an User.


## Features

Get following Insights for any github user: 

- Public Repos
- Followers
- Following
- Gists
- Profile
## Screenshots

![App Screenshot](https://user-insights.vercel.app/preview.webp)


## Demo

https://user-insights.vercel.app/



## Tech Stack

- [Next.js](https://nextjs.org/)
- [Github Graphql API](https://docs.github.com/en/graphql)
- [ApolloClient](https://www.apollographql.com/)
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)




## API Reference

#### GET User data

```http
  GET /api/getData
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Github username for fetching data |



## Run Locally

Clone the project

```bash
  git clone https://github.com/ssahibsingh/github-user-insights
```

Go to the project directory

```bash
  cd github-user-insights
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GITHUB_TOKEN`

Create your own Github token from [here](https://github.com/settings/tokens)


## Contributing

Contributions are always welcome! Just raise an issue, we will discuss it.


## Feedback

If you have any feedback, please reach out to me [here](https://ssahibsingh.github.io/#contact)
