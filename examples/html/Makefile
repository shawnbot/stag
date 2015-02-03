API_URL ?= http://petstore.swagger.wordnik.com/api/api-docs/

all: output.html

output.html: template.html
	node ../bin/stag $(API_URL) $< > $@

clean:
	rm -f output.html
