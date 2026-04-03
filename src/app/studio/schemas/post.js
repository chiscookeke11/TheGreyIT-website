// /studio/schemas/post.js

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: R => R.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: R => R.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      validation: R => R.max(160)
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt text', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'AI & Tech', value: 'ai-tech' },
          { title: 'Africa', value: 'africa' },
          { title: 'Digital Access', value: 'digital-access' },
          { title: 'Research', value: 'research' }
        ]
      }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' }
            ],
            annotations: [{
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                { name: 'href', type: 'url', title: 'URL' },
                { name: 'blank', type: 'boolean', title: 'Open in new tab' }
              ]
            }]
          }
        },
        {
          name: 'pullQuote',
          title: 'Pull quote',
          type: 'object',
          fields: [
            { name: 'text', title: 'Quote', type: 'text', rows: 2, validation: R => R.required() },
            { name: 'attribution', title: 'Attribution', type: 'string' }
          ]
        },
        {
          name: 'callout',
          title: 'Callout box',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: { list: ['info', 'warning', 'tip'], layout: 'radio' },
              initialValue: 'info'
            },
            { name: 'text', title: 'Text', type: 'text', rows: 2, validation: R => R.required() }
          ]
        },
        {
          name: 'figure',
          title: 'Image',
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: R => R.required() },
            { name: 'alt', title: 'Alt text', type: 'string', validation: R => R.required() },
            { name: 'caption', title: 'Caption', type: 'string' },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              options: { list: ['normal', 'wide'], layout: 'radio' },
              initialValue: 'normal'
            }
          ]
        }
      ]
    }
  ]
}
