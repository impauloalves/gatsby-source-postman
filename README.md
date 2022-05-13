## Description

Gatsby Source plugin for pulling Postman collections.
### Learning Resources

* https://www.gatsbyjs.com/
* https://www.postman.com/
* https://learning.postman.com/docs/developer/intro-api/
## How to install

```sh
npm install --save gatsby-source-postman
```
## Examples of usage

In your gatsby-config.js :

```js
{
  resolve: `gatsby-source-postman`,
  options: {
    apiToken: `<your Postman API token>`,
    collectionId: `<your Postman Collection id>`
  }
}
```

## How to query for data

### Query details from a Postman Collection

```js
export const pageQuery = graphql`
{
  collection {
    id
    name
    description
  }
}
`;
```

### Query all requests from the Postman Collection

```js
export const query = graphql`
{
  allRequest {
    nodes {
      id
      name
      request {
        description
        method
        url {
          raw
        }
      }
    }
  }
}
`;
```
