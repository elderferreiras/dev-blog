module.exports = {
  siteMetadata: {
    title: `Elder's Blog`,
    author: {
      name: `Sharad Raj`,
      bio: `<p>
              Software Developer | Seattle, WA
            </p>
            <p>
              <em>he/him/his</em>
            </p>
            `,
      dp: "https://elder-patten-ferreira-resume.s3.us-west-2.amazonaws.com/assets/images/profile.jpg",
      social: {
        github: {
          title: "github",
          username: `elderferreiras`,
          url: `https://github.com/`,
        },
        linkedin: {
          title: "linkedin",
          username: `elder-patten-ferreira`,
          url: `https://linkedin.com/in/`,
        },
        twitter: {
          title: "twitter",
          username: `elderpattenferreira`,
          url: `https://twitter.com/`,
        },
        dev: { title: "dev", username: `UCZnoo50Qofo3uUCrZ_pz1mg`, url: `https://www.youtube.com/channel/` },
        email: { title: "email", username: `elderpattenferreira@gmail.com`, url: `mailto:` },
      },
    },
    description: `Elder's Blog`,
    siteUrl: `https://elderf.com/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-plugin-tags",
            options: {
              templatePath: `${__dirname}/src/templates/tag.js`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Serial Programmer RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Serial Programmer`,
        short_name: `Gatsby Serial Programmer`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
