# stag
Stag provides a [JavaScript API](index.js) and a [command line tool](#cli)
for generating static documentation from [Swagger] API metadata.

See the [issues] for more info, and leave a comment or [file an issue] if
you have suggestions.

## <a name="cli"></a> Command Line Usage
First, install stag via [npm]:

```sh
npm install -g stag
```

Next, write a simple [template]:

```html
<!DOCTYPE html>
<title>{{ info.title }}</title>
<h1>{{ info.title }} / version {{ apiVersion }}</h1>
```

Then, point it at a [Swagger] API URL and your template:

```sh
stag http://petstore.swagger.wordnik.com/api/api-docs/ template.html
```

This will produce:

```html
<!DOCTYPE html>
<title>Swagger Sample App</title>
<h1>Swagger Sample App / version 1.0.0</h1>
```

Check out the [examples](examples) for more usage tips, or just run `stag --help`:

```
Swagger static generator version 0.1.0:

  stag [ options ] <url> [ <template> [ <output> ] ]

  <url> is a Swagger-compliant JSON URL, e.g.
    http://petstore.swagger.wordnik.com/api/api-docs

  <template> is either:
    1. a relative filename,
    2. a template name in one of the template paths indicated by one or more -p
       or --path options, or
    3. empty, "-" or "/dev/stdin" to read the template from stdin

  <output> is an optional filename to which the rendered template should be
    written, or a directory to which multiple files should be written if
    --dir is specified. If left off, the output will be written to stdout.

Examples:

  Use only positional arguments:
  $ swagger-static $API_URL template.html output.html

  Produce output on stdout and redirect to a file:
  $ swagger-static $API_URL template.html > output.html

  Provide the template on stdin, output on stdout:
  $ echo "{{ swaggerVersion }}" | swagger-static $API_URL


Options:
  -d, --dir         process <template> as a directory of files                  
  -p, --path        add this directory to the list of template paths            
  -a, --autoescape  auto-escape HTML in template tags                           
  -E, --enhanced    indicates that the Swagger JSON is already 'enhanced'       
  -e, --encoding    when reading the template from stdin, use this encoding
                    (default: 'utf8')                                           
  -v                print the version number and exit                           
```

## Templates
Stag uses [Nunjucks] to render templates, which supports a subset of the
[template language](https://docs.djangoproject.com/en/1.7/topics/templates/)
originally developed for [Django] and adopted by [Jinja], [Liquid], [Swig]
[Plate], and many other template systems. There are some
[caveats](https://github.com/shawnbot/stag/issues/5), though.

## Background
At [18F] we're building [Swagger]-compliant APIs to make them more accessible
and facilitate simpler, dynamically generated documentation for API users.
Unfortunately, the only generally accepted way of exposing human-readable
Swagger API documentation is [SwaggerUI], a client-side JavaScript library with
some non-trivial shortcomings:

1. Because all SwaggerUI-based documentation is rendered at runtime, search
   engines are [[theoretically](https://developers.google.com/webmasters/ajax-crawling/)]
   unable to crawl their contents.
1. Tight coupling with jQuery and a [long list of dependencies](https://github.com/swagger-api/swagger-ui/blob/master/dist/index.html#L10-L21)
   means that you've got to include everything they include, or it just won't
   run.
1. Tight coupling between the [distributed JavaScript source](https://github.com/swagger-api/swagger-ui/blob/master/dist/swagger-ui.js)
   and [HTML](https://github.com/swagger-api/swagger-ui/blob/master/dist/index.html),
   e.g. lots of [hard-coded CSS selectors](https://github.com/swagger-api/swagger-ui/blob/master/dist/swagger-ui.js#L23)
   means that it's a huge pain to customize the output.
1. Unweildy and largely redundant [stylesheets](https://github.com/swagger-api/swagger-ui/blob/master/dist/css/screen.css),
   which are tricky to override and impractical to rewrite.

My plan was (and is) to make a suite of tools and templates that faciliate the
generation of static, human-readable documentation to replace SwaggerUI. Check
out the [issues] to see where I am and provide feedback.

[18F]: https://18f.gsa.gov
[issues]: https://github.com/shawnbot/swagger-static/issues
[file an issue]: https://github.com/shawnbot/swagger-static/issues/new
[Swagger]: http://swagger.io
[SwaggerUI]: https://github.com/swagger-api/swagger-ui/
[swagger-enhance]: https://github.com/shawnbot/swagger-enhance
[swagger-template]: https://github.com/shawnbot/swagger-template
[Django]: https://djangoproject.com/
[npm]: https://npmjs.com
[stag]: https://npmjs.com/stag
[Nunjucks]: http://mozilla.github.io/nunjucks/
[Jinja]: http://jinja.pocoo.org/docs/dev/templates/
[Liquid]: http://liquidmarkup.org/
[Plate]: https://github.com/chrisdickinson/plate
