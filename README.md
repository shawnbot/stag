# swagger-static
A plan for a better [Swagger] API documentation generator.

See the [issues] for more info, and comment on one or [file an issue] if you have suggestions.

## Background
At [18F] we're building [Swagger]-compliant APIs to make them more accessible and facilitate simpler, dynamically generated documentation for API users. Unfortunately, the only generally accepted way of exposing human-readable Swagger API documentation is [SwaggerUI], a client-side JavaScript library with some non-trivial shortcomings:

1. Because all SwaggerUI-based documentation is rendered at runtime, search engines are [[theoretically](https://developers.google.com/webmasters/ajax-crawling/)] unable to crawl their contents.
1. Tight coupling with jQuery and a [long list of dependencies](https://github.com/swagger-api/swagger-ui/blob/master/dist/index.html#L10-L21) means that you've got to include everything they include, or it just won't run.
1. Tight coupling between the [distributed JavaScript source](https://github.com/swagger-api/swagger-ui/blob/master/dist/swagger-ui.js) and [HTML](https://github.com/swagger-api/swagger-ui/blob/master/dist/index.html), e.g. lots of [hard-coded CSS selectors](https://github.com/swagger-api/swagger-ui/blob/master/dist/swagger-ui.js#L23) means that it's a huge pain to customize the output.
1. Unweildy and largely redundant [stylesheets](https://github.com/swagger-api/swagger-ui/blob/master/dist/css/screen.css), which are tricky to override and impractical to rewrite.

## The Plan
My plan is to make a suite of tools and templates that faciliate the generation of static, human-readable documentation to replace SwaggerUI. At this point, I've made two repos:

1. [swagger-template], just some HTML files that should theoretically be useful for generating static HTML documentation for a Swagger-compliant API.
2. [swagger-enhance], a little Node utility for grabbing a Swagger API's JSON and "enhancing" it with JSON data from each of its own endpoints (confusingly, "apis", in Swagger parlance).

The missing piece is a tool I'm referring to as `swagger-static`, which would take a "enhanced" JSON representation of an API's metadata and a template to produce static docs in whatever form you want: primarily HTML, but [Markdown] might also be useful for [Jekyll] sites.

[18F]: https://18f.gsa.gov
[issues]: https://github.com/shawnbot/swagger-static/issues
[file an issue]: https://github.com/shawnbot/swagger-static/issues/new
[Swagger]: http://swagger.io
[SwaggerUI]: https://github.com/swagger-api/swagger-ui/
[swagger-enhance]: https://github.com/shawnbot/swagger-enhance
[swagger-template]: https://github.com/shawnbot/swagger-template
[Markdown]: http://daringfireball.net/projects/markdown/
[Jekyll]: http://jekyllrb.com/
[Django-style template]: https://docs.djangoproject.com/en/1.7/topics/templates/
[npm]: https://npmjs.com
