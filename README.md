# Eagle Experts

> Next.js site used to manage experts pages. AWS Amplify used to communicate with AWS services

## Site Setup

This site uses Next.js and powers multiple experts pages. Depending on the environmental variables, it pulls
experts for that specific location. Users can use AWS cognito auth to login and manage experts. The site is
hosted on netlify, and uses next-on-netlify plugin to handle SSR pages. (Proxies request to lambda if server side is needed).
Data is stored on DynamoDB. More about the primary key structure below.

## Development

Create a file called `.env.local` and add `NEXT_PUBLIC_SITE=JC` for example.
`npm run dev`

## Production

Next has the build plugin that coverts SSR pages to lambda functions defined in `netlify.toml`
